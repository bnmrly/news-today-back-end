const express = require('express');
const router = express.Router();

const topicsRouter = require('./topics');
router.use('/topics', topicsRouter);

const articlesRouter = require('./articles');
router.use('/articles', articlesRouter);

const userRouter = require('./users');
router.use('/users', userRouter);

module.exports = router;
