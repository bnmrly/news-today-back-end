const { Topic, Article, User, Comment } = require('../models');

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
    .lean()
    .populate('created_by')
    .then(articles => {
      if (!articles) throw { status: 400 };
      const countPromises = articles.map(article =>
        Comment.count({ belongs_to: article._id })
      );
      return Promise.all([articles, ...countPromises]);
    })
    .then(([articlesDocs, ...commentCounts]) => {
      const articles = articlesDocs.map((article, i) => ({
        ...article,
        comments: commentCounts[i]
      }));
      res.status(200).send({ articles });
    })
    .catch(err => {
      if (err.name === 'CastError') return next({ status: 400 });
      else next(err);
    });
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
