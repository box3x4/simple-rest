const router = require('express').Router();
const passport = require('passport');

const passportConfig = require('../passport');
const authorApi = require('../api/author.api');

const authentication = passport.authenticate('jwt', { session: false });

router.route('/authors')
    .get(authentication, authorApi.authorList)
    .post(authentication, authorApi.authorSubmit)
    .delete(authentication, authorApi.authorDelete);

router.route('/authors/:authorId')
    .get(authentication, authorApi.authorById);

module.exports = router;
