const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, getProductById } = require('../controllers/productController');

router.post('/', createProduct);         // Add a new product
router.get('/', getAllProducts);         // Get all products
router.get('/:id', getProductById);      // Get product by ID

module.exports = router;
