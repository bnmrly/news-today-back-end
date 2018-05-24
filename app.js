const express = require('express');
const mongoose = require('mongoose');

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
const db_url = require('./config')[process.env.NODE_ENV];

mongoose.connect(db_url).then(() => console.log(`connected to ${db_url}`));

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

app.get('/*', (req, res, next) => {
  next({ status: 404 });
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ message: 'Page not found' });
  }
  if (err.status === 400) {
    res.status(404).send({ message: 'Bad Request' });
  } else next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: 'Internal Server Error' });
});

module.exports = app;
