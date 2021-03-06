const { Article, Comment, User } = require('../models');

exports.getArticles = (req, res, next) => {
  Article.find()
    .lean()
    .populate('created_by', 'username')
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

exports.getArticlesById = (req, res, next) => {
  return Promise.all([
    Article.findById(req.params.article_id)
      .lean()
      .populate('created_by'),
    Comment.count({ belongs_to: req.params.article_id })
  ])

    .then(([article, commentCount]) => {
      if (!article) throw { status: 404 };
      res.status(200).send({ ...article, comments: commentCount });
    })
    .catch(err => {
      if (err.name === 'CastError') return next({ status: 400 });
      else next(err);
    });
};

exports.getCommentsForArticle = (req, res, next) => {
  const { article_id } = req.params;
  return Comment.find({ belongs_to: article_id })
    .populate('created_by')
    .then(comments => {
      if (!comments) throw { status: 404 };
      res.status(200).send({ comments });
    })
    .catch(err => {
      if (err.name === 'CastError') return next({ status: 400 });
      else next(err);
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
        created_by: user
      });
    })
    .then(comment => {
      res.status(201).send(comment);
    })
    .catch(err => {
      if (err.name === 'ValidationError') return next({ status: 400 });
      else next(err);
    });
};

exports.voteOnArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { vote } = req.query;
  const amount = vote === 'up' ? 1 : vote === 'down' ? -1 : 0;
  return Article.findByIdAndUpdate(
    article_id,
    { $inc: { votes: amount } },
    { new: true }
  )
    .then(article => res.status(200).send({ article }))
    .catch(next);
};
