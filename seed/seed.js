const mongoose = require('mongoose');
const { Article, Comment, Topic, User } = require('../models');
const {
  articlesRawData,
  commentsRawData,
  topicsRawData,
  usersRawData
} = require('./devData/');

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
      console.log(userDocs);
      const formattedArticles = articlesRawData.map(article => {
        const belongs_to = article.topic;
        const created_by = userDocs.find(
          user => user.username === article.created_by
        )._id;
        return { ...article, belongs_to, created_by };
      });
      const articlePromises = Article.insertMany(formattedArticles);
      return Promise.all([userDocs, topicDocs, articlePromises]);
    })
    .then(([userDocs, topicDocs, articleDocs]) => {
      const formattedComments = commentsRawData.map(comment => {
        const belongs_to = articleDocs.find(
          article => article.title === comment.belongs_to
        )._id;
        const created_by = userDocs.find(
          user => user.username === comment.created_by
        )._id;
        return { ...comment, belongs_to, created_by };
      });
      console.log(formattedComments);
      const commentPromises = Comment.insertMany(formattedComments);
      return Promise.all([userDocs, topicDocs, articleDocs, commentPromises]);
    });
};

module.exports = seedDB;
