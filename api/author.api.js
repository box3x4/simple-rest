const Author = require('../model/author.model');
const Book = require('../model/book.model');

async function authorList(req, res, next) {

    try {

        const docs = await Author.find({});

        if(docs.length)
            return res.status(200).send(docs);
        else
            return res.status(204).send([]);

    } catch(err) {

        return res.status(500).send(err);
    }
};

async function authorById(req, res, next) {

    try {

        const author = await Author.findById(req.params.authorId);

        if(author != null) {

            const books = await Book.find({ _id: { $in: author.author_books } });
                
            let response = [];
            response.push(author, books)

            return res.status(200).send(response);

        } else {

            return res.status(204).send({});
        }

    } catch(err) {

        return res.status(500).send(err);
    }
}

async function authorSubmit(req, res, next) {

    try {

        const newAuthor = new Author(req.body);

        const status = await newAuthor.save();

        if(status != null)
            return res.status(201).send('Entry created');
        else
            return res.status(500).send('Error creating author')

    } catch(err) {

        return res.status(500).send(err);
    }
};

async function authorDelete(req, res, next) {

    try {

        const status = await Author.findOneAndRemove(req.body);

        if(status != null)
            return res.status(200).send('Entry deleted');
        else
            return res.status(500).send('Error deleting author');

    } catch(err) {

        return res.status(500).send(err);
    }
};

module.exports = {
    
    authorList,
    authorSubmit,
    authorDelete,
    authorById
};
