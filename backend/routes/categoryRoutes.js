const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/categoryController');

router.get('/',        ctrl.listCategories);
router.get('/:id',     ctrl.getCategory);
// router.post('/create', ctrl.createCategory);
router.put ('/update', ctrl.updateCategory);
router.delete('/delete', ctrl.deleteCategory);

module.exports = router;
