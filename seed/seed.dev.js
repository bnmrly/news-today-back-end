const db_url = require('../config')[process.env.NODE_ENV];
const mongoose = require('mongoose');
const seedDB = require('./seed');
const {
  articlesRawData,
  commentsRawData,
  topicsRawData,
  usersRawData
} = require('./devData');

mongoose
  .connect(db_url)
  .then(() => {
    return seedDB(
      articlesRawData,
      commentsRawData,
      topicsRawData,
      usersRawData
    );
  })
  .then(() => {
    return mongoose.disconnect();
  })
  .catch(console.log);
