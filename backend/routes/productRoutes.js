const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route để lấy danh sách sản phẩm
router.get('/', productController.getAllProducts);

// Route để lấy sản phẩm theo ID
router.get('/:id', productController.getProductById);

// Route để tạo sản phẩm mới (nếu có)
// router.post('/', productController.createProduct);

module.exports = router;
