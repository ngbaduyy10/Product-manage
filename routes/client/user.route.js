const express = require('express');
const router = express.Router();
const userController = require('../../controllers/client/user.controller');
const validate = require('../../validates/user.validate');
const userMiddleware = require('../../middleware/client/user.middleware');

router.get('/register', userMiddleware.loginCheck, userController.register);

router.post('/register', validate.register, userController.registerPost);

router.get('/login', userMiddleware.loginCheck, userController.login);

router.post('/login', validate.login, userController.loginPost)

router.get('/logout', userController.logout);

module.exports = router;