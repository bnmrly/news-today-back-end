const express = require('express');
const router = express.Router();
const {
  getArticles,
  getArticlesById,
  getCommentsForArticle,
  addCommentToArticle
} = require('../controllers/articles');

router.route('/').get(getArticles);

router.route('/:id').get(getArticlesById);

router
  .route('/:article_id/comments')
  .get(getCommentsForArticle)
  .post(addCommentToArticle);

module.exports = router;
