const mongoose = require('../db');
const Schema = mongoose.Schema;
const Book = require('./book.model');

const authorSchema = new Schema({
    author_name: {
        type: String,
        required: true
    },
    author_books: [{
        type: String,
        required: false
    }]
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;