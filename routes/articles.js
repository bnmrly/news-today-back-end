const express = require('express');
const router = express.Router();
const {
  getArticles,
  getArticlesById
  // getCommentsForArticle
  // addCommentToArticle
} = require('../controllers/articles');

router.route('/').get(getArticles);
router.route('/:id').get(getArticlesById);
// router.route('/:id/comments').post(addCommentToArticle);

module.exports = router;
