const Category = require("../schemas/Category");
const { BASE_URL } = process.env;
const { validationResult } = require("express-validator");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.json({ categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json({
      category,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const updates = {
      ...(name && { name }),
    };

    const category = await Category.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ message: "Category updated successfully", category });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json({ message: "Category deleted successfully", category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name } = req.body;
    const category = new Category({
      name,
    });

    await category.save();
    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  createCategory,
};
