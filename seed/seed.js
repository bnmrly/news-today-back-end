const mongoose = require('mongoose');
const { Article, Comment, Topic, User } = require('../models');
const {
  articlesRawData,
  commentsRawData,
  topicsRawData,
  usersRawData
} = require('./devData/');

const { formatArticles, formatComments } = require('../utils/seed.utils');

const seedDB = (
  articlesRawData,
  commentsRawData,
  topicsRawData,
  usersRawData
) => {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      const userPromises = User.insertMany(usersRawData);
      const topicPromises = Topic.insertMany(topicsRawData);
      return Promise.all([userPromises, topicPromises]);
    })
    .then(([userDocs, topicDocs]) => {
      const formattedArticles = formatArticles(articlesRawData, userDocs);
      const articlePromises = Article.insertMany(formattedArticles);
      return Promise.all([userDocs, topicDocs, articlePromises]);
    })
    .then(([userDocs, topicDocs, articleDocs]) => {
      const formattedComments = formatComments(
        commentsRawData,
        articleDocs,
        userDocs
      );
      const commentPromises = Comment.insertMany(formattedComments);
      return Promise.all([userDocs, topicDocs, articleDocs, commentPromises]);
    });
};

module.exports = seedDB;
