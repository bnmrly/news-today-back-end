# News Today

News Today is a social news aggregation and rating website.

It allows you to:

- Read and post articles based on topic
- Comment on articles (and delete your comment)
- Vote for (and against!) previously posted articles and comments

## API

Please click here for a link to the RESTful API : https://ben-nc-news.herokuapp.com/API which details routes and methods.

## Getting started

You will need [node](https://nodejs.org/en/) and [mongo](https://docs.mongodb.com/manual/installation/) installed, please follow the links for instructions on how to do this.

## Installation

Plese fork and clone this repository with the terminal command:

```
git clone https://github.com/<yourusername>/news-today-back-end.git
```

Navigate to the News Today Directory

```
cd news-today-back-end
```

Then run the the following command to install all dependencies, which can be seen in the package.json file

```
npm i
```

## Running the local development environment

To run the environment locally, you wil need to have mongod running. Please enter the following command in a seperate shell:

```
mongod
```

## Config

Please make a config folder with the following three files:

an index.js file with:

```
module.exports = {
  test: require('./test'),
  development: require('./development')
};
```

a development.js file with:

```
module.exports = { db_url: 'mongodb://localhost:27017/<db-filename>' };
```

a test.js file with:

```
module.exports = { db_url: 'mongodb://localhost:27017/<db-filename-test>' };
```

IMPORTANT NOTES:

Please ensure your config and node modules are included in your .gitignore file

## Seed instructions

A command line script for seeing your database has been written for you, please see package.json scripts. This can be done with the following command:

```
npm run seed:dev
```

The test database is seeded before each it block is executed.

You can now launch the api locally with the command:

```
npm run dev
```

The dev enviroment will default to serve the api on port 9090 and connect to the local dev database. [Nodemon](https://nodemon.io/) will automatically restart the server if you save any changes in the codebase.

You should be able to access the local api in your browser:

```
http://localhost:9090/api
```

For example, accessing the below should return all 36 dev articles:

```
http://localhost:9090/api/articles
```

## Testing

There is a full test-suite available which tests all routes and methods on the api. You can run the tests with the following command:

```
npm test
```

This will automatically connect to the test database, seed the raw test data before each test and disconnect from the test database when complete.

## Built With

- Express
- MongoDB
- Mongoose
- Mocha
- Chai
- Supertest

## Authors

Ben Marley

[http://benmarley.co.uk/](http://benmarley.co.uk/)

## Acknowledgments

Thanks to my fellow students and all the great staff at Northcoders, with special thanks to Jac Darby, for his support and mentorship.
