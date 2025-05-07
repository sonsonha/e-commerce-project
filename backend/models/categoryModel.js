const sql = require('mssql');
// const config = require('../config/config');

async function manageCategory(action, categoryID = null, categoryName = null, description = null) {
  const pool = await sql.connect(config);
  const req = pool.request();
  req.input('Action', sql.NVarChar(10), action);
  req.input('CategoryID', sql.Int, categoryID);
  req.input('CategoryName', sql.NVarChar(100), categoryName);
  req.input('Description', sql.NVarChar(255), description);
  return req.execute('QuanLyLoaiSanPham');
}

async function getAllCategories() {
  const pool = await sql.connect(config);
  const result = await pool.request()
    .query('SELECT CategoryID, CategoryName, Description FROM LoaiSanPham');
  return result.recordset;
}

async function getCategoryByID(id) {
  const pool = await sql.connect(config);
  const result = await pool.request()
    .input('CategoryID', sql.Int, id)
    .query('SELECT CategoryID, CategoryName, Description FROM LoaiSanPham WHERE CategoryID = @CategoryID');
  return result.recordset[0];
}

module.exports = { manageCategory, getAllCategories, getCategoryByID };
