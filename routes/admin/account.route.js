const express = require('express');
const router = express.Router();
const accountController = require('../../controllers/admin/account.controller');

router.get('/', accountController.index);

router.get('/create', accountController.create);

router.post('/create', accountController.createPost);

router.get('/edit/:id', accountController.edit);

router.patch('/edit/:id', accountController.editPost);

module.exports = router;