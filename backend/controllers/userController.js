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

// Lấy danh sách người dùng
const getUsers = async (req, res) => {
    try {
        const users = await userModel.getUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error occurred while fetching users.' });
    }
};

const getUser = async (req, res) => {
    const userID = parseInt(req.params.id, 10);
    if (isNaN(userID)) {
      return res.status(400).json({ message: 'Invalid userID' });
    }
    try {
      const user = await userModel.getUserById(userID);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error occurred while fetching user.' });
    }
  };

module.exports = {
    registerUser,
    updateUser,
    deleteUser,
    getUsers,
    getUser
};
