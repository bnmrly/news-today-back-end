const { Article, Comment } = require('../models');

exports.getArticles = (req, res, next) => {
  console.log('hi');
  return Article.find().then(articles => {
    res.status(200).send({ articles });
  });
};

exports.getArticlesById = (req, res, next) => {
  return Article.findById(req.params.id).then(article => {
    res.status(200).send(article);
  });
};

exports.getCommentsForArticle = (req, res, next) => {
  const { article_id } = req.params;
  return Comment.find({ belongs_to: article_id }).then(comments => {
    res.status(200).send({ comments });
  });
};
