const express = require('express');
const router = express.Router();
const {
  getTopics,
  getArticlesByTopicSlug,
  addArticleToTopic
} = require('../controllers/topics');

router.route('/').get(getTopics);
router
  .route('/:belongs_to/articles')
  .get(getArticlesByTopicSlug)
  .post(addArticleToTopic);

module.exports = router;
