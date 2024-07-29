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

router.get('/password/forgot', userMiddleware.loginCheck, userController.forgotPassword);

router.post('/password/forgot', validate.forgotPassword, userController.forgotPasswordPost);

router.get('/password/otp', userMiddleware.loginCheck, userController.otp);

router.post('/password/otp', validate.otp, userController.otpPost);

router.get('/password/reset', userMiddleware.loginCheck, userController.resetPassword);

router.post('/password/reset', validate.resetPassword, userController.resetPasswordPost);

module.exports = router;