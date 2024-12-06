const { Router } = require("express");
const router = Router();

const {
  validateCategory,
  validateDeleteCategory,
  validateCategoryUpdate,
} = require("../validation/category");
const {
  getAllCategories,
  getCategoryById,
  deleteCategory,
  createCategory,
  updateCategory,
} = require("../controllers/category");

router.get("/", getAllCategories);
router.put("/:id", validateCategoryUpdate, updateCategory);
router.post("/", validateCategory, createCategory);
router.get("/:id", getCategoryById);

router.delete("/:id", validateDeleteCategory, deleteCategory);

module.exports = router;
