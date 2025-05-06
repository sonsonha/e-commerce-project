const sql = require('mssql');
const config = require('../config/config');

// Hàm thêm người dùng mới
const createUser = async (fullName, phoneNumber, gender, avatarUrl, userType) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('Action', sql.NVarChar, 'INSERT')
            .input('FullName', sql.NVarChar, fullName)
            .input('PhoneNumber', sql.VarChar, phoneNumber)
            .input('Gender', sql.NVarChar, gender)
            .input('AvatarUrl', sql.NVarChar, avatarUrl || null)
            .input('UserType', sql.NVarChar, userType)
            .execute('QuanLyNguoiDung');
        return result;
    } catch (err) {
        throw new Error('Error in database operation: ' + err.message);
    }
};

// Hàm cập nhật thông tin người dùng
const updateUser = async (userID, fullName, phoneNumber, gender, avatarUrl, userType) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('Action', sql.NVarChar, 'UPDATE')
            .input('UserID', sql.Int, userID)
            .input('FullName', sql.NVarChar, fullName)
            .input('PhoneNumber', sql.VarChar, phoneNumber)
            .input('Gender', sql.NVarChar, gender)
            .input('AvatarUrl', sql.NVarChar, avatarUrl || null)
            .input('UserType', sql.NVarChar, userType)
            .execute('QuanLyNguoiDung');
        return result;
    } catch (err) {
        throw new Error('Error in database operation: ' + err.message);
    }
};

// Hàm xóa người dùng
const deleteUser = async (userID) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('Action', sql.NVarChar, 'DELETE')
            .input('UserID', sql.Int, userID)
            .execute('QuanLyNguoiDung');
        return result;
    } catch (err) {
        throw new Error('Error in database operation: ' + err.message);
    }
};

module.exports = {
    createUser,
    updateUser,
    deleteUser
};
