const router = require('express').Router();
const passport = require('passport');

const passportConfig = require('../passport');
const usersApi = require('../api/users.api');

router.route('/users/signup')
    .post(usersApi.userSignUp);

router.route('/users/login')
    .post(passport.authenticate('local', { session: false }), usersApi.userLogin);

module.exports = router;