const express = require('express');
const router = express.Router();
const myAccountController = require('../../controllers/admin/myAccount.controller');

router.get('/', myAccountController.index);

router.get('/edit', myAccountController.edit);

router.patch('/edit', myAccountController.editPatch);

module.exports = router;