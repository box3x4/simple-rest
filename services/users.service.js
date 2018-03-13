const JWT = require('jsonwebtoken');

const User = require('../models/user.model');
const jwtSign = require('../utils/jwt.utils');

async function userSignUp(req, res, next) {
  try {
    const foundUser = await User.findOne({ username: req.body.username });

    if (foundUser) {
      return next(new Error('Username taken'));
    }

    const newUser = new User(req.body);

    const user = await newUser.save();

    return res.status(201).send({
      message: 'User signed up successfully',
      data: user
    });
  } catch (err) {
    return next(new Error(err.message));
  }
}

async function userLogin(req, res) {
  const token = jwtSign(req.user.id);

  return res.status(200).send({
    message: 'User logged in successfuly',
    data: token
  });
}

module.exports = {
  userSignUp,
  userLogin
};
