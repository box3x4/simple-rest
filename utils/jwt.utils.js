const JWT = require('jsonwebtoken');

const JWT_SECRET = require('../configs/jwt.config');

const jwtSign = function(user) {
    const token = JWT.sign(
        {
            sub: user._id
        },
        JWT_SECRET
    );

    return token;
};

module.exports = jwtSign;
