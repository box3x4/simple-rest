const mongoose = require('../db');
const Schema = mongoose.Schema;
const Author = require('./author.model');

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

bookSchema.post('save', async function(doc) {

    try {

        const result = await Author.findOneAndUpdate( { author_name: doc.book_author }, { $push: { author_books: doc.id } }, { upsert: true });

        if(result) {
            
            return result;

        } else {

            return null;

        }
    } catch(err) {

        return null;
    }
});

bookSchema.post('findOneAndRemove', async function(doc) {

    try {

        const result = await Author.findOneAndUpdate({ author_name: doc.book_author }, { $pull: { author_books: doc.id } });

        if(result) {
            
            return result;

        } else {

            return null;

        }
    } catch(err) {

        return null;
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;