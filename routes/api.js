const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res, next) => {
  console.log('hi');
  res.sendFile(path.join(__dirname, '../public/html/index.html'));
});

const topicsRouter = require('./topics');
router.use('/topics', topicsRouter);

const articlesRouter = require('./articles');
router.use('/articles', articlesRouter);

const userRouter = require('./users');
router.use('/users', userRouter);

const commentsRouter = require('./comments');
router.use('/comments', commentsRouter);

module.exports = router;
