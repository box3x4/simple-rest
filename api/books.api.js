const Book = require('../model/book.model');

async function bookList(req, res, next) {

    try {

        const docs = await Book.find({});

        if(docs.length)
            return res.status(200).send(docs);
        else
            return res.status(204).send([]);

    } catch(err) {

        return res.status(500).send(err);
    }
};

async function bookSubmit(req, res, next) {

    try {

        const newBook = new Book(req.body);

        const status = await newBook.save();

        if(status != null)
            return res.status(201).send('Entry created');
        else
            return res.status(500).send('Error creating book')

    } catch(err) {

        return res.status(500).send(err);
    }
};

async function bookDelete(req, res, next) {

    try {

        const status = await Book.findOneAndRemove(req.body);

        if(status != null)
            return res.status(200).send('Entry deleted');
        else
            return res.status(500).send('Error deleting book');

    } catch(err) {

        return res.status(500).send(err);
    }
};

module.exports = {
    
    bookList,
    bookSubmit,
    bookDelete
};
