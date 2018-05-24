const { Article, Comment, User } = require('../models');

exports.getArticles = (req, res, next) => {
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

exports.addCommentToArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { comment } = req.body;
  const userPromise = User.findOne();
  return userPromise
    .then(user => {
      return Comment.create({
        body: comment,
        belongs_to: article_id,
        created_by: user._id
      });
    })
    .then(comment => {
      res.status(201).send(comment);
    })
    .catch(console.log);
};
