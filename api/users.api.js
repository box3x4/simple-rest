const JWT = require('jsonwebtoken');

const User = require('../model/user.model');
const JWT_SECRET = require('../config/jwt.config').jwtSecret;

const jwtSign = function(user) {

    const token = JWT.sign({
        sub: user.id
    }, JWT_SECRET);

    return token;
};

async function userSignUp(req, res, next) {
    
    try {

        const foundUser = await User.findOne({ username: req.body.username });

        if(foundUser) {
            return res.status(403).send('Username taken');
        }

        const newUser = new User(req.body);

        const user = await newUser.save();

        if(user != null) {

            const token = jwtSign(user);

            return res.status(201).send({ token });

        }
        else {

            return res.status(500).send('Error creating user');
        }

    } catch(err) {

        return res.status(500).send(err);
    }
};

async function userLogin(req, res, next) {

    const token = jwtSign(req.user);

    res.status(200).send({ token });
}

module.exports = {

    userSignUp,
    userLogin
}