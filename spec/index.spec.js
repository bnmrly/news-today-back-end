const app = require('../app');
// no need to set the process env here as done in the script
const { expect } = require('chai');
const mongoose = require('mongoose');
const seedDb = require('../seed/seed');
const testData = require('../seed/testData');
const request = require('superest')(app);

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
