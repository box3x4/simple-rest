const mongoose = require('../db');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  book_name: {
    type: String,
    required: true
  },
  book_price: {
    type: Number,
    required: false
  },
  book_desc: {
    type: String,
    required: false
  },
  book_author: {
    type: String,
    required: true
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
