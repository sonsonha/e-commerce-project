const Product = require('../models/productModel');

// Create a new product
const createProduct = async (req, res) => {
  const { name, description, price, stock, imageUrl } = req.body;
  try {
    const product = await Product.create({ name, description, price, stock, imageUrl });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create product' });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch products' });
  }
};

// Get a single product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch product' });
  }
};

module.exports = { createProduct, getAllProducts, getProductById };
