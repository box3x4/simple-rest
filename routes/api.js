let Book = require('../model/books.js');

async function get(req, res, next) {

    let docs;

    try {
        docs = await Book.find(req.query);
    } catch(err) {
        return res.status(500).send(err);
    }

    if(docs.length)
        return res.status(200).send(docs);
    else
        return res.status(204).send([]);

};

async function post(req, res, next) {

    let doc;

    try {
        doc = await Book.findOneAndUpdate({book_name: req.body.book_name}, req.body, { upsert: true });
    } catch(err) {
        return res.status(500).send(err);
    }
        
    return res.status(201).send();
};

async function del(req, res, next) {

    let resp;

    try {
        resp = await Book.findOneAndRemove({book_name: req.query.book_name});
    } catch(err) {
        return res.status(500).send(err);
    }

    return res.status(200).send(resp);
};

module.exports = {
    
    get: get,
    post: post,
    del: del
};
