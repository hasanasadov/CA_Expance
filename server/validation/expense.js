const { checkSchema } = require("express-validator");

const validateExpense = checkSchema({
  price: {
    in: ["body"],
    required: true,
    isFloat: {
      options: { min: 0 },
      errorMessage: "Price must be a positive number",
    },
    notEmpty: {
      errorMessage: "Price is required",
    },
  },
  category: {
    in: ["body"],
    required: true,
    isMongoId: {
      errorMessage: "Invalid category ID",
    },
  },
});

const validateExpenseUpdate = checkSchema({
  price: {
    in: ["body"],
    optional: true,
    isFloat: {
      options: { min: 0 },
      errorMessage: "Price must be a positive number",
    },
  },
});

module.exports = {
  validateExpense,
  validateExpenseUpdate,
};
