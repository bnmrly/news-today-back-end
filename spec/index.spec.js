const app = require('../app');
const { expect } = require('chai');
const mongoose = require('mongoose');
const seedDB = require('../seed/seed.js');
const {
  articlesRawData,
  commentsRawData,
  topicsRawData,
  usersRawData
} = require('../seed/testdata');
const request = require('supertest')(app);

describe('/api', () => {
  let users, topics, articles, comments;
  beforeEach(() => {
    return seedDB(
      articlesRawData,
      commentsRawData,
      topicsRawData,
      usersRawData
    ).then(docs => {
      [users, topics, articles, comments] = docs;
      console.log(`db succesfully seeded`);
    });
  });
  after(() => {
    return mongoose.disconnect();
  });
  describe('/topics', () => {
    it('GET sends back status 200 and etc', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(res => {
          expect(res.body.topics.length).to.equal(topics.length);
        });
    });
  });
});
