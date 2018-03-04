const JWT = require('jsonwebtoken');

const User = require('../models/user.model');
const JWT_SECRET = require('../configs/jwt.config').jwtSecret;
const jwtSing = require('../utils/jwt.utils');

async function userSignUp(req, res) {
    try {
        const foundUser = await User.findOne({ username: req.body.username });

        if (foundUser) {
            return res.status(403).send({
                message: 'Username taken',
                data: ''
            });
        }

        const newUser = new User(req.body);

        const user = await newUser.save();

        return res.status(201).send({
            message: 'User signed up successfully'
        });
    } catch (err) {
        return res.status(500).send({
            message: 'Error signing up the User',
            data: err
        });
    }
}

async function userLogin(req, res) {
    const token = jwtSign(req.user);

    return res.status(200).send({
        message: 'User logged in successfuly',
        data: token
    });
}

module.exports = {
    userSignUp,
    userLogin
};
