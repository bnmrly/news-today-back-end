const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
const { db_url } =
  process.env.NODE_ENV === 'production'
    ? process.env
    : require('./config')[process.env.NODE_ENV];

mongoose.connect(db_url).then(() => console.log(`connected to ${db_url}`));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

app.get('/*', (req, res, next) => {
  next({ status: 404 });
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ message: 'Page not found' });
  } else if (err.status === 400) {
    res.status(400).send({ message: 'Bad Request' });
  } else next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: 'Internal Server Error' });
});

module.exports = app;
