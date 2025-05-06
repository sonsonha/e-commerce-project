const userModel = require('../models/userModel');

// Đăng ký người dùng
const registerUser = async (req, res) => {
    const { fullName, phoneNumber, gender, avatarUrl, userType } = req.body;
    try {
        const result = await userModel.createUser(fullName, phoneNumber, gender, avatarUrl, userType);
        res.status(200).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Error occurred during registration.' });
    }
};

// Cập nhật thông tin người dùng
const updateUser = async (req, res) => {
    const { userID, fullName, phoneNumber, gender, avatarUrl, userType } = req.body;
    try {
        const result = await userModel.updateUser(userID, fullName, phoneNumber, gender, avatarUrl, userType);
        res.status(200).json({ message: 'User updated successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Error occurred during update.' });
    }
};

// Xóa người dùng
const deleteUser = async (req, res) => {
    const { userID } = req.body;
    try {
        const result = await userModel.deleteUser(userID);
        res.status(200).json({ message: 'User deleted successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Error occurred during deletion.' });
    }
};

module.exports = {
    registerUser,
    updateUser,
    deleteUser
};
