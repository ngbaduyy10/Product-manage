const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/client/users.controller');

router.get('/list', usersController.list);

router.get('/friend', usersController.friend);

router.get('/request', usersController.request);

router.get('/accept', usersController.accept);

module.exports = router;