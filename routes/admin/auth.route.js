const express = require('express');
const router = express.Router();
const accountController = require('../../controllers/admin/auth.controller');
const validate = require('../../validates/auth.validate');

router.get('/login', accountController.login);

router.post('/login', validate.loginPost, accountController.loginPost);

router.get('/logout', accountController.logout);

module.exports = router;