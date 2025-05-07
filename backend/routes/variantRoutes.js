const express = require('express');
const router = express.Router();
const variantController = require('../controllers/variantController');

// Routes for CRUD operations
router.get   ('/',             variantController.getVariants);     // Get all variants
router.get   ('/:variantID',   variantController.getVariantById);  // Get variant by ID
router.post  ('/create',       variantController.createVariant);   // Create new variant
router.put   ('/update',       variantController.updateVariant);   // Update variant
router.delete('/delete',       variantController.deleteVariant);   // Delete variant

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const variantController = require('../controllers/variantController');

// // Route để lấy danh sách biến thể
// router.get('/', variantController.getVariants);

// // Route để lấy thông tin biến thể theo ID
// router.get('/:variantID', variantController.getVariantById);

// // Route để tạo mới biến thể
// router.post('/', variantController.createVariant);

// // Route để cập nhật biến thể
// router.put('/update', variantController.updateVariant);

// // Route để xóa biến thể
// router.delete('/delete', variantController.deleteVariant);

// module.exports = router;
