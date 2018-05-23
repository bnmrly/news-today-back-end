const express = require('express');
const router = express.Router();
const { getArticles } = require('../controllers/articles');

router.route('/').get(getArticles);
// router
//   .route('/:belongs_to/articles')
//   .get(getArticlesByTopicSlug)
//   .post(addArticleToTopic);

module.exports = router;
