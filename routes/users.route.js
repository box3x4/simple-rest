const router = require('express').Router();

const logIn = require('../middlewares/login.middleware');
const usersService = require('../services/users.service');

router.route('/users/signup').post(usersService.userSignUp);

router.route('/users/login').post(logIn, usersService.userLogin);

module.exports = router;
