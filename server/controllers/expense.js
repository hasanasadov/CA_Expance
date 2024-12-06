const { validationResult } = require("express-validator");
const Expense = require("../schemas/Expense");
const Category = require("../schemas/Category");

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate("category");
    res.status(200).json({ success: true, data: expenses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id).populate("category");
    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }
    res.status(200).json({ success: true, data: expense });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { price, category } = req.body;

    const updates = {
      ...(price && { price }),
      ...(category && { category }),
    };

    const expense = await Expense.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).populate("category");

    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    res.status(200).json({ success: true, data: expense });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const postExpense = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { price, category } = req.body;

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    const expense = new Expense({ price, category });
    await expense.save();

    res.status(201).json({ success: true, data: expense });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const addCategoryToExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const { category } = req.body;

    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    const existingCategory = await Category.findById(category);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    expense.category = existingCategory;
    await expense.save();

    res.status(200).json({ success: true, data: expense });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateCategoryFromExpense = async (req, res) => {
  try {
    const { expenceId } = req.params;
    const { category } = req.body;

    const expense = await Expense.findById(expenceId);
    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    const existingCategory = await Category(category);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    expense.category = existingCategory;

    await expense.save();

    res.status(200).json({
      success: true,
      message: "Category updated from expense",
      data: expense,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  updateExpense,
  postExpense,
  addCategoryToExpense,
  updateCategoryFromExpense,
  deleteExpense,
};
