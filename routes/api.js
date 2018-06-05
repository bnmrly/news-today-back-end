const express = require('express');
const router = express.Router();
const path = require('path');
const {
  topicsRouter,
  articlesRouter,
  usersRouter,
  commentsRouter
} = require('./index');

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/html/index.html'));
});

router.use('/topics', topicsRouter);
router.use('/articles', articlesRouter);
router.use('/users', usersRouter);
router.use('/comments', commentsRouter);

module.exports = router;
