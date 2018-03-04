const router = require('express').Router();

const booksService = require('../services/books.service');
const authentication = require('../middlewares/jwt.middleware');

router.use('/books', authentication);

router
    .route('/books')
    .get(booksService.bookList)
    .post(booksService.bookSubmit)
    .delete(booksService.bookDelete)
    .put(booksService.bookUpdate);

router.route('/books/q=:bookId').get(booksService.bookListById);

module.exports = router;
