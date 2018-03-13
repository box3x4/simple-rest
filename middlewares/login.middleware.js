const User = require('../models/user.model');

const logIn = async function(req, res, next) {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      const isValid = await user.isValidPassword(req.body.password);

      if (isValid) {
        req.user = user;

        return next();
      }
    }

    throw new Error('User or password invalid');
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = logIn;
