const {
    manageCategory,
    getAllCategories,
    getCategoryByID
  } = require('../models/categoryModel');
  
  async function listCategories(req, res) {
    try {
      const cats = await getAllCategories();
      res.json(cats);
    } catch (e) {
      res.status(500).json({ message: 'Không lấy được danh sách loại.' });
    }
  }
  
  async function getCategory(req, res) {
    const id = parseInt(req.params.id);
    try {
      const cat = await getCategoryByID(id);
      if (!cat) return res.status(404).json({ message: 'Không tìm thấy loại.' });
      res.json(cat);
    } catch (e) {
      res.status(500).json({ message: 'Lỗi khi lấy thông tin loại.' });
    }
  }
  
  // async function createCategory(req, res) {
  //   const { categoryName, description } = req.body;
  //   if (!categoryName) return res.status(400).json({ message: 'Tên loại không được bỏ trống.' });
  //   try {
  //     await manageCategory('INSERT', null, categoryName, description);
  //     res.status(201).json({ message: 'Đã tạo loại thành công.' });
  //   } catch (e) {
  //     res.status(500).json({ message: 'Lỗi khi tạo loại.' });
  //   }
  // }
  
  async function createCategory(req, res) {
    const { categoryName, description } = req.body;
    if (!categoryName) return res.status(400).json({ message: 'Tên loại không được bỏ trống.' });
    try {
      await manageCategory('INSERT', null, categoryName, description);
      res.status(201).json({ message: 'Đã tạo loại thành công.' });
    } catch (e) {
      res.status(500).json({ message: 'Lỗi khi tạo loại.' });
    }
  }

  async function updateCategory(req, res) {
    const { categoryID, categoryName, description } = req.body;
    if (!categoryID || !categoryName) return res.status(400).json({ message: 'ID và tên loại bắt buộc.' });
    try {
      await manageCategory('UPDATE', categoryID, categoryName, description);
      res.json({ message: 'Cập nhật loại thành công.' });
    } catch (e) {
      res.status(500).json({ message: 'Lỗi khi cập nhật loại.' });
    }
  }
  
  async function deleteCategory(req, res) {
    const { categoryID } = req.body;
    if (!categoryID) return res.status(400).json({ message: 'ID loại bắt buộc.' });
    try {
      await manageCategory('DELETE', categoryID);
      res.json({ message: 'Xóa loại thành công.' });
    } catch (e) {
      res.status(500).json({ message: 'Lỗi khi xóa loại.' });
    }
  }
  
  module.exports = {
    listCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
  };
  