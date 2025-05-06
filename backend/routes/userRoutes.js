const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route đăng ký người dùng
router.post('/register', userController.registerUser);

// Route cập nhật người dùng
router.put('/update', userController.updateUser);

// Route xóa người dùng
router.delete('/delete', userController.deleteUser);

module.exports = router;
