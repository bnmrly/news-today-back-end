const express = require('express');
const router = express.Router();
const { getArticles, getArticlesById } = require('../controllers/articles');

router.route('/').get(getArticles);
router.route('/:id').get(getArticlesById);
// .post(addArticleToTopic);

module.exports = router;
