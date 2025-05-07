const sql = require('mssql');
const config = require('../config/config');

// Lấy danh sách sản phẩm
exports.getProducts = async () => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .query('SELECT ProductID, ProductName, Description FROM SanPham');
    return result.recordset;
  } catch (err) {
    console.error('Error fetching products:', err);
    throw new Error('Error fetching products');
  }
};

// Lấy sản phẩm theo ID
exports.getProductById = async (productID) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('ProductID', sql.Int, productID)
      .query('SELECT ProductID, ProductName, Description FROM SanPham WHERE ProductID = @ProductID');
    return result.recordset[0];  // Trả về sản phẩm đầu tiên nếu tìm thấy
  } catch (err) {
    console.error('Error fetching product:', err);
    throw new Error('Error fetching product');
  }
};

// Tạo sản phẩm mới
exports.createProduct = async (productName, description) => {
  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('ProductName', sql.NVarChar, productName)
      .input('Description', sql.NVarChar, description)
      .query('INSERT INTO SanPham (ProductName, Description) VALUES (@ProductName, @Description)');
  } catch (err) {
    console.error('Error creating product:', err);
    throw new Error('Failed to create product');
  }
};
