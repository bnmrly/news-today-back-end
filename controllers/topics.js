const { Topic, Article, User } = require('../models');

exports.getTopics = (req, res, next) => {
  return Topic.find().then(topics => {
    res.status(200).send({ topics });
  });
};

exports.getArticlesByTopicSlug = (req, res, next) => {
  console.log(req.params);
  return Article.find(req.params).then(article => {
    res.status(200).send(article);
  });
};

exports.addArticleToTopic = (req, res, next) => {
  console.log({ ...req.body, params: req.params });
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
    .catch(console.log);
};
