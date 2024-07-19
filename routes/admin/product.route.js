const express = require('express');
const router = express.Router();
const multer  = require('multer')
const storage = require('../../helpers/storageMulter');
const upload = multer({ storage: storage() })
const productController = require('../../controllers/admin/product.controller');
const validate = require('../../validates/product.validate');

router.get('/', productController.index);

router.delete('/delete/:id', productController.deleteItem);

router.delete('/delete-multi', productController.deleteMulti);

router.get('/create', productController.create);

router.post('/create', upload.single('thumbnail'), validate.createPost, productController.createPost);

router.get('/edit/:id', productController.edit);

router.patch('/edit/:id', upload.single('thumbnail'), validate.createPost, productController.editPatch);

router.get('/detail/:slug', productController.detail);

module.exports = router;