const express = require('express');
const router = express.Router();
const {
  getArticles,
  getArticlesById,
  getCommentsForArticle
} = require('../controllers/articles');

router.route('/').get(getArticles);

router.route('/:id').get(getArticlesById);

router.route('/:article_id/comments').get(getCommentsForArticle);

module.exports = router;
