const { checkSchema } = require("express-validator");

const validateCategory = checkSchema({
  name: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Name is required.",
    },
    isString: {
      errorMessage: "Name must be a string.",
    },
    isLength: {
      options: { max: 100 },
      errorMessage: "Name cannot exceed 100 characters.",
    },
  },
});

const validateCategoryUpdate = checkSchema({
  id: {
    in: ["params"],
    isMongoId: {
      errorMessage: "Invalid product ID",
    },
  },
  name: {
    in: ["body"],
    optional: true,
    notEmpty: {
      errorMessage: "Product name cannot be empty",
    },
  },
});

const validateDeleteCategory = checkSchema({
  id: {
    in: ["params"],
    isMongoId: {
      errorMessage: "Invalid product ID",
    },
  },
});

module.exports = {
  validateCategory,
  validateCategoryUpdate,
  validateDeleteCategory,
};
