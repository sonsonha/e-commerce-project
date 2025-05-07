const sql    = require('mssql');
const config = require('../config/config');

// Create new variant
exports.createVariant = async (productID, name, price, attribute, value, stockQuantity) => {
  const pool = await sql.connect(config);
  return pool.request()
    .input('Action',     sql.NVarChar, 'INSERT')
    .input('ProductID',  sql.Int,      productID)
    .input('Name',       sql.NVarChar, name)
    .input('Price',      sql.Decimal,  price)
    .input('Attribute',  sql.NVarChar, attribute)
    .input('Value',      sql.NVarChar, value)
    .input('StockQuantity', sql.Int,  stockQuantity)
    .execute('QuanLyBienThe');
};

// Update variant
exports.updateVariant = async (variantID, productID, name, price, attribute, value, stockQuantity) => {
  const pool = await sql.connect(config);
  return pool.request()
    .input('Action',     sql.NVarChar, 'UPDATE')
    .input('VariantID',  sql.Int,      variantID)
    .input('ProductID',  sql.Int,      productID)
    .input('Name',       sql.NVarChar, name)
    .input('Price',      sql.Decimal,  price)
    .input('Attribute',  sql.NVarChar, attribute)
    .input('Value',      sql.NVarChar, value)
    .input('StockQuantity', sql.Int,   stockQuantity)
    .execute('QuanLyBienThe');
};

// Delete variant
exports.deleteVariant = async (variantID) => {
  const pool = await sql.connect(config);
  return pool.request()
    .input('Action',     sql.NVarChar, 'DELETE')
    .input('VariantID',  sql.Int,      variantID)
    .execute('QuanLyBienThe');
};
