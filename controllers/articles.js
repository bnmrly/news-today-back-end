const { Article, Comment, User } = require('../models');

exports.getArticles = (req, res, next) => {
  return Article.find().then(articles => {
    res.status(200).send({ articles });
  });
};

// exports.getArticles = (req, res, next) => {
//   Article.find().lean()
//     .then(articles => {
//       return Promise.all([articles, ...articles.map(artObj => Comment.count({ belongs_to: artObj._id }))])
//     })
//     .then(([articles, ...commentCounts]) => {
//       let result = articles.map((artObj, index) => {
//         artObj.comments = commentCounts[index]
//         return artObj;
//       })
//       res.send({ articles: result })
//     })
//  }

exports.getArticlesById = (req, res, next) => {
  return Article.findById(req.params.article_id)
    .then(article => {
      res.status(200).send(article);
    })
    .catch(console.log);
};

exports.getCommentsForArticle = (req, res, next) => {
  const { article_id } = req.params;
  return Comment.find({ belongs_to: article_id })
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(console.log);
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

exports.voteOnArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { vote } = req.query;
  return Article.findByIdAndUpdate(article_id)
    .then(article => {
      vote === 'up' ? article.votes++ : article.votes--;
      return article.save().then(article => res.status(200).send({ article }));
    })
    .catch(console.log);
};
