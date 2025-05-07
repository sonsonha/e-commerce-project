const Product = require('../models/productModel');

// Lấy tất cả sản phẩm
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.getProducts();  // Gọi từ model
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch products' });
  }
};

// Lấy một sản phẩm theo ID
const getProductById = async (req, res) => {
  const productID = req.params.id;
  try {
    const product = await Product.getProductById(productID);  // Gọi từ model
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch product' });
  }
};

// Tạo một sản phẩm mới
const createProduct = async (req, res) => {
  const { productName, description } = req.body;
  try {
    await Product.createProduct(productName, description);  // Gọi từ model
    res.status(201).json({ message: 'Product created successfully!' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create product' });
  }
};

module.exports = { getAllProducts, getProductById, createProduct };
