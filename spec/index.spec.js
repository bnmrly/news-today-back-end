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
  describe('/users/:username', () => {
    it('GET returns a 200 status and the user information for accurate input', () => {
      return request
        .get(`/api/users/${users[0].username}`)
        .expect(200)
        .then(res => {
          expect(res.body.user.avatar_url).to.equal(
            'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg'
          );
        });
    });
  });

  describe('/topics', () => {
    it('GET sends back status 200 and all topics', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(res => {
          expect(res.body.topics.length).to.equal(topics.length);
        });
    });
    it('GET sends back status 404 and error page', () => {
      return request
        .get('/api/topics/rtwdssddsger')
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal('Page not found');
        });
    });
  });
  describe('/topics/:belongs_to/articles', () => {
    it('GET returns a 200 status and all articles attached to a topic', () => {
      return request
        .get('/api/topics/mitch/articles')
        .expect(200)
        .then(res => {
          expect(res.body.articles.length).to.equal(2);
          expect(res.body.articles[0].body).to.equal(
            'I find this existence challenging'
          );
        });
    });
    it('POST returns a 201 and the posted game when the data is correct', () => {
      return request
        .post('/api/topics/cats/articles')
        .send({
          title: 'this is my new article title',
          body: 'This is my new article content'
        })
        .expect(201)
        .then(res => {
          expect(res.body.title).to.equal('this is my new article title');
          return request.get('/api/topics/cats/articles').then(res => {
            expect(res.body.articles.length).to.equal(3);
          });
        });
    });
    it('POST returns a 400 when the data is correct', () => {
      return request
        .post('/api/topics/coding/articles')
        .send({
          title: 'this is my new article title',
          incorrect: 'This is my new article content'
        })
        .expect(400)
        .then(res => {
          expect(res.body.message).to.equal('Bad Request');
        });
    });
  });
  describe('/articles/', () => {
    it('GET returns a 200 status and all articles', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then(res => {
          expect(res.body.articles.length).to.equal(articles.length);
          expect(res.body.articles[0].comments).to.equal(2);
        });
    });
    it('GET sends back status 400 and error page', () => {
      return request
        .get('/api/articles/rtwger')
        .expect(400)
        .then(res => {
          expect(res.body.message).to.equal('Bad Request');
        });
    });
  });
  describe('/articles/:article_id', () => {
    it('GET returns a 200 status and requested article by id', () => {
      return request
        .get(`/api/articles/${articles[3]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body.title).to.equal(
            'UNCOVERED: catspiracy to bring down democracy'
          );
        });
    });
    it('PUT with a query of vote up returns a 200 status and increases article vote by 1', () => {
      return request
        .put(`/api/articles/${articles[3]._id}?vote=up`)
        .expect(200)
        .then(res => {
          expect(res.body.article.votes).to.equal(1);
        });
    });
    it('PUT with a query of vote down returns a 200 status and decreases article vote by 1', () => {
      return request
        .put(`/api/articles/${articles[2]._id}?vote=down`)
        .expect(200)
        .then(res => {
          expect(res.body.article.votes).to.equal(-1);
        });
    });
  });
  describe('/articles/:article_id/comments', () => {
    it('GET returns a 200 status and the relevant comments by article ID', () => {
      return request
        .get(`/api/articles/${articles[3]._id}/comments`)
        .expect(200)
        .then(res => {
          expect(res.body.comments[0].body).to.equal(
            'What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.'
          );
        });
    });
    it('POST returns a 201 status and the posted comment when the data is correct', () => {
      return request
        .post(`/api/articles/${articles[3]._id}/comments`)
        .send({
          comment: 'This is my new comment'
        })
        .expect(201)
        .then(res => {
          expect(res.body.body).to.equal('This is my new comment');
        });
    });
    it('POST returns a 400 status for an incorrectly formatted comment', () => {
      return request
        .post(`/api/articles/${articles[3]._id}/comments`)
        .send({
          'wrong key name': 'This is my new article content'
        })
        .expect(400)
        .then(res => {
          expect(res.body.message).to.equal('Bad Request');
        });
    });
  });
  describe('/comments/:comment_id', () => {
    it('PUT with a query of vote up returns a 200 status and increases comment vote by 1', () => {
      return request
        .put(`/api/comments/${comments[1]._id}?vote=up`)
        .expect(200)
        .then(res => {
          expect(res.body.comment.votes).to.equal(20);
        });
    });
    it('PUT with a query of vote down returns a 201 status and decreases comment vote by 1', () => {
      return request
        .put(`/api/comments/${comments[1]._id}?vote=down`)
        .expect(200)
        .then(res => {
          expect(res.body.comment.votes).to.equal(18);
        });
    });
    it('DELETE returns a 204 status and removes a comment by id', () => {
      return request
        .delete(`/api/comments/${comments[0]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body.message).to.equal('successfully deleted comment');
        });
    });
    it('DELETE returns a 400 status for an incorrect id', () => {
      return request
        .delete('/api/comments/sdffsdfsd')
        .expect(400)
        .then(res => {
          expect(res.body.message).to.equal('Bad Request');
        });
    });
  });
});
