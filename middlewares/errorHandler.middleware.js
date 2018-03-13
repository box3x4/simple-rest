const errorHandler = function(err, req, res, next) {
  console.log(err.stack);
  return res.status(500).send({
    message: err.message,
    data: {}
  });
};

module.exports = errorHandler;
