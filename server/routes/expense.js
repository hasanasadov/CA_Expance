const { Router } = require("express");
const {
  validateExpenseUpdate,
  validateExpense,
} = require("../validation/expense");
const {
  getAllExpenses,
  updateExpense,
  postExpense,
  addCategoryToExpense,
  deleteExpense,
  getExpenseById,
  updateCategoryFromExpense,
  getExpenseByCategoryId,
} = require("../controllers/expense");
const router = Router();

router.get("/", getAllExpenses);

router.get("/:id", getExpenseById);
router.get("/bycategory/:id", getExpenseByCategoryId);

router.put("/:id", validateExpenseUpdate, updateExpense);

router.post("/", validateExpense, postExpense);

router.post("/add/:expenseId", addCategoryToExpense);

router.post("/update/:expenseId", updateCategoryFromExpense);

router.delete("/:id", deleteExpense);

module.exports = router;
