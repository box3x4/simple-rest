const mongoose = require('./db');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    book_name: {
        type: String,
        required: true
    },
    book_price: {
        type: Number,
        required: false,
        default: 0
    },
    book_desc: {
        type: String,
        required: false,
        default: 'No description'
    },
    book_author: {
        type: String,
        required: true
    },
    book_edition: {
        type: Number,
        required: false,
        default: 0
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;