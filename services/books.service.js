const Book = require('../models/book.model');

async function bookList(req, res) {
  try {
    const docs = await Book.find({});

    if (docs.length)
      return res.status(200).send({
        message: 'Books found',
        data: docs
      });
    else
      return res.status(200).send({
        message: 'Collection is empty',
        data: []
      });
  } catch (err) {
    throw new Error(err.message);
  }
}

async function bookListById(req, res) {
  try {
    const doc = await Book.findOne({ _id: req.query.bookId });

    if (doc)
      return res.status(200).send({
        message: 'Book found',
        data: doc
      });
    else
      return res.status(200).send({
        message: 'Book not found',
        data: {}
      });
  } catch (err) {
    throw new Error(err.message);
  }
}

async function bookSubmit(req, res) {
  try {
    const newBook = new Book(req.body);

    const doc = await newBook.save();

    return res.status(201).send({
      message: 'New Book created',
      data: doc
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

async function bookDelete(req, res) {
  try {
    const doc = await Book.findOneAndRemove(req.body.id);

    return res.status(200).send({
      message: 'Book deleted',
      data: doc
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

async function bookUpdate(req, res) {
  try {
    const _id = req.body.id;

    delete req.body.id;

    const updateBody = req.body;

    const doc = await Book.findOneAndUpdate({ _id }, updateBody);

    return res.status(200).send({
      message: 'Book updated',
      data: doc
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  bookList,
  bookListById,
  bookSubmit,
  bookDelete,
  bookUpdate
};
