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

        return res.status(401).send({
            message: 'User or password invalid',
            data: {}
        });
    } catch (err) {
        return res.status(500).send({
            message: 'Database error',
            data: err
        });
    }
};

module.exports = logIn;
