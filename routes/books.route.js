const router = require('express').Router();
const passport = require('passport');

const passportConfig = require('../passport');
const booksApi = require('../api/books.api');

const authentication = passport.authenticate('jwt', { session: false });

router.route('/books')
    .get(authentication, booksApi.bookList)
    .post(authentication, booksApi.bookSubmit)
    .delete(authentication, booksApi.bookDelete);

module.exports = router;
