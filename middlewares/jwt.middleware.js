const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const JWT_SECRET = require('../configs/jwt.config').jwtSecret;

const authJwt = async function(req, res, next) {
  try {
    const token = req.get('Authorization').split(' ')[1];

    const decodedToken = await jwt.verify(token, JWT_SECRET);

    const user = await User.findOne({ _id: decodedToken.sub });

    req.user = user;
    return next();
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = authJwt;
