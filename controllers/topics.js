const { Topic, Article, User } = require('../models');

exports.getTopics = (req, res, next) => {
  return Topic.find()
    .then(topics => {
      if (!topics) throw { status: 404 };
      res.status(200).send({ topics });
    })
    .catch(next);
};

exports.getArticlesByTopicSlug = (req, res, next) => {
  return Article.find(req.params)
    .then(articles => {
      if (!articles.length) throw { status: 404 };
      res.status(200).send(articles);
    })
    .catch(next);
};

exports.addArticleToTopic = (req, res, next) => {
  const userPromise = User.findOne();
  return userPromise
    .then(user => {
      return Article.create({
        ...req.body,
        ...req.params,
        created_by: user._id
      });
    })
    .then(article => {
      res.status(201).send(article);
    })
    .catch(err => {
      if (err.name === 'ValidationError') return next({ status: 400 });
      else next(err);
    });
};
