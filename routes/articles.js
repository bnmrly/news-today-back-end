const express = require('express');
const router = express.Router();
const {
  getArticles,
  getArticlesById,
  getCommentsForArticle,
  addCommentToArticle,
  voteOnArticle
} = require('../controllers/articles');

router.route('/').get(getArticles);

router
  .route('/:article_id')
  .get(getArticlesById)
  .put(voteOnArticle);

router
  .route('/:article_id/comments')
  .get(getCommentsForArticle)
  .post(addCommentToArticle);

module.exports = router;
