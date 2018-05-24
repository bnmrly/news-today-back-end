// no need to set the process env here as done in the script

const app = require('../app');
const { expect } = require('chai');
const mongoose = require('mongoose');
const seedDB = require('../seed/seed.js');
const testData = require('../seed/testdata');
const request = require('supertest')(app);

// need to add comments  as not created yet
describe('/api'),
  () => {
    let articles, topics, users;
    beforeEach(() => {
      return seedDB(testData).then(docs => {
        [articles, topics, users] = docs;
      });
    });
    after(() => {
      return mongoose.disconnect();
    });
    describe('/topics', () => {
      it('GET sends back status 200 and etc', () => {
        return request
          .get('/actors')
          .expect(200)
          .then(res => {
            expect(res.body.actors.length).to.equal();
          });
      });
    });
  };

//describe('db name')

// let actors, comapnies, movies

// before each

// console.log db succesfully seeded with commentdocs.length

// return seedDB(testData)

// seed dbs returns an aray of docs if we set it up right - console.log and see

// inside the before each

// after

// return mongoose.disconnect

// describe route

// return request

//.get('./actors')
//.expect(200)
//.then()
// expect res.body.actors lemngth to equal(proper number here)

// to grab hold of ids:

//
