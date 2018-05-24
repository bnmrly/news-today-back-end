const { Article, Comment } = require('../models');

// fn below gets both actors and queries e.g gender: female as without giving a query, it retuns ALL

// run this to get the female actors http://localhost:3000/api/actors?gender=female

exports.getArticles = (req, res, next) => {
  console.log('hi');
  return Article.find().then(articles => {
    res.send({ articles });
  });
};

exports.getArticlesById = (req, res, next) => {
  return Article.findById(req.params.id).then(article => {
    res.send(article);
  });
};

// exports.getCommentsForArticle = (req, res, next) => {
//   console.log(Comment);
// };
