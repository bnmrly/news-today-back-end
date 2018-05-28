# Northcoders News

Northcoders News is a social news aggregation and rating website. It is similar to Reddit as it has articles which are divided into topics. Each article has user ratings and can be voted up or down using the API. Users can also add comments to an article and these comments can also be voted up or down.

## API

Please click here for a link to the API : https://ben-nc-news.herokuapp.com/API

## Installation Instructions

You will need Node.js to run Northcoders News. To check if it is installed, please type the following terminal command:

```
$ node -v
```

If already installed, the output will display the version number. If not, please click here to install node: http://nodejs.org/en/

Once Node is installed, please install Mongo - further info here: https://docs.mongodb.com/manual/installation/

Once Node and Mongo is installed, please clone this repository: https://github.com/bnmrly/BE-FT-northcoders-news by typing the following command:

```
$ git clone https://github.com/bnmrly/BE-FT-northcoders-news
```

To install all dependencies please enter the following commands into the terminal, in the root of 'BE-FT-northcoders-news'

```
$ npm install
```

## Running the local development environment

Please run mongod in a seperate shell to run the environment on your local machine:

```
mongod
```

Then type the following command to launch the api locally in development mode

```
$ npm run dev
```

This will seed the development database and start Nodemon, which will restart if any changes are made to the code.

You can access the local api in your browser at:

```
http://localhost:9090/api
```

## Test Suite

To run the test suite please type:

```
$ npm test
```

## Author

Ben Marley

[http://benmarley.co.uk/](http://benmarley.co.uk/)

## Acknowledgments

Thanks to my fellow students and all the great staff at Northcoders, with special thanks to Jac Darby, for his support and mentorship.
