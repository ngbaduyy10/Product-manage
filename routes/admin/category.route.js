const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/admin/category.controller');
const validate = require('../../validates/product.validate');

const multer  = require('multer');
const upload = multer();
const middleware = require('../../middleware/middleware');

router.get('/', categoryController.index);

router.get('/create', categoryController.create);

router.post(
    '/create',
    upload.single('thumbnail'),
    middleware.uploadCloud,
    validate.createPost,
    categoryController.createPost
);

module.exports = router;