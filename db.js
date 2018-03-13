const mongoose = require('mongoose');
mongoose.connect(
  'mongodb://root:botanico@ds147518.mlab.com:47518/simple-rest-git',
  { useMongoClient: true }
);

mongoose.Promise = global.Promise;

module.exports = mongoose;
