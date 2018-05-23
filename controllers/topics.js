const { Topic, Article, User } = require('../models');

// fn below gets both actors and queries e.g gender: female as without giving a query, it retuns ALL

// run this to get the female actors http://localhost:3000/api/actors?gender=female

exports.getTopics = (req, res, next) => {
  return Topic.find().then(topics => {
    res.send({ topics });
  });
};

exports.getArticlesByTopicSlug = (req, res, next) => {
  console.log(req.params);
  return Article.find(req.params).then(article => {
    res.send(article);
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
      res.send(article);
    })
    .catch(console.log);
};
