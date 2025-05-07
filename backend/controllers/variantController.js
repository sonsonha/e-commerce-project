const sql    = require('mssql');
const config = require('../config/config');
const model  = require('../models/variantModel');

// Get all variants
// exports.getVariants = async (req, res) => {
//   try {
//     const pool = await sql.connect(config);
//     const { recordset } = await pool.request()
//       .query('SELECT VariantID, ProductID, Name, Price, Attribute, Value, StockQuantity FROM BienThe');
//     res.json(recordset);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error occurred while fetching variants.' });
//   }
// };

// Get all variants with Product Name
exports.getVariants = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const { recordset } = await pool.request()
      .query(`
        SELECT 
          b.VariantID, 
          b.ProductID, 
          b.Name, 
          b.Price, 
          b.Attribute, 
          b.Value, 
          b.StockQuantity, 
          p.ProductName
        FROM BienThe b
        INNER JOIN SanPham p ON b.ProductID = p.ProductID
      `);
    res.json(recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error occurred while fetching variants.' });
  }
};


// Get variant by ID
exports.getVariantById = async (req, res) => {
  const id = parseInt(req.params.variantID, 10);
  try {
    const pool = await sql.connect(config);
    const { recordset } = await pool.request()
      .input('VariantID', sql.Int, id)
      .query('SELECT VariantID, ProductID, Name, Price, Attribute, Value, StockQuantity FROM BienThe WHERE VariantID = @VariantID');
    if (!recordset.length) return res.status(404).json({ message: 'Variant not found.' });
    res.json(recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error occurred while fetching variant.' });
  }
};

// Create new variant
exports.createVariant = async (req, res) => {
  const { productID, name, price, attribute, value, stockQuantity } = req.body;
  try {
    await model.createVariant(productID, name, price, attribute, value, stockQuantity);
    res.status(201).json({ message: 'Variant created successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error occurred during creation.' });
  }
};

// Update variant
exports.updateVariant = async (req, res) => {
  const { variantID, productID, name, price, attribute, value, stockQuantity } = req.body;
  try {
    await model.updateVariant(variantID, productID, name, price, attribute, value, stockQuantity);
    res.json({ message: 'Variant updated successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error occurred during update.' });
  }
};

// Delete variant
exports.deleteVariant = async (req, res) => {
  const { variantID } = req.body;
  try {
    await model.deleteVariant(variantID);
    res.json({ message: 'Variant deleted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error occurred during deletion.' });
  }
};





// const Variant = require('../models/variantModel');

// // Lấy tất cả biến thể
// const getVariants = async (req, res) => {
//   try {
//     const variants = await Variant.getVariants();
//     res.status(200).json(variants);
//   } catch (error) {
//     res.status(400).json({ error: 'Failed to fetch variants' });
//   }
// };

// // Lấy thông tin biến thể theo ID
// const getVariantById = async (req, res) => {
//   const variantID = req.params.variantID;
//   try {
//     const variant = await Variant.getVariantById(variantID);
//     res.status(200).json(variant);
//   } catch (error) {
//     res.status(400).json({ error: 'Failed to fetch variant' });
//   }
// };

// // Tạo biến thể mới
// const createVariant = async (req, res) => {
//   const { productID, name, price, attribute, value, stockQuantity } = req.body;
//   try {
//     await Variant.createVariant(productID, name, price, attribute, value, stockQuantity);
//     res.status(201).json({ message: 'Variant created successfully!' });
//   } catch (error) {
//     res.status(400).json({ error: 'Failed to create variant' });
//   }
// };

// // Cập nhật biến thể
// const updateVariant = async (req, res) => {
//   const { variantID, productID, name, price, attribute, value, stockQuantity } = req.body;
//   try {
//     await Variant.updateVariant(variantID, productID, name, price, attribute, value, stockQuantity);
//     res.status(200).json({ message: 'Variant updated successfully!' });
//   } catch (error) {
//     res.status(400).json({ error: 'Failed to update variant' });
//   }
// };

// // Xóa biến thể
// const deleteVariant = async (req, res) => {
//   const { variantID } = req.body;
//   try {
//     await Variant.deleteVariant(variantID);
//     res.status(200).json({ message: 'Variant deleted successfully!' });
//   } catch (error) {
//     res.status(400).json({ error: 'Failed to delete variant' });
//   }
// };

// module.exports = { getVariants, getVariantById, createVariant, updateVariant, deleteVariant };
