let Book = require('../model/books.js');

const get = (req, res, next) => {

    Book.find(req.query, (err, docs) => {
        
        if(err) {      
            return res.status(500).send(err);
        }

        if(docs.length) {
            return res.status(200).send(docs);
        } else {
            return res.status(204).send([]);
        }
    });
};

const post = (req, res, next) => {

    Book.findOneAndUpdate({book_name: req.body.book_name}, req.body, { upsert: true }, (err, doc) => {
        
        if(err) {
            return res.status(500).send(err);
        }
        
        return res.status(201).send(doc);
    });
};

const del = (req, res, next) => {

    Book.findOneAndRemove({book_name: req.query.book_name}, (err, resp) => {

        if(err) {
            return res.status(500).send(err);
        }

        return res.status(200).send(resp);
    });
};

module.exports = {
    
    get: get,
    post: post,
    del: del
};