const express = require('express');
const router = express.Router();

const topicsRouter = require('./topics');
router.use('/topics', topicsRouter);

const articlesRouter = require('./articles');
router.use('/articles', articlesRouter);

module.exports = router;
