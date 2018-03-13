const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const booksRoute = require('./routes/books.route');
const usersRoute = require('./routes/users.route');

const errorHandler = require('./middlewares/errorHandler.middleware');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/', [booksRoute, usersRoute]);

app.use(errorHandler);

module.exports = app;
