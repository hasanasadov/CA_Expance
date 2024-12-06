const mongoose = require("mongoose");

const expense = new mongoose.Schema({
  price: { type: Number, default: 0 },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const Expense = mongoose.model("Expense", expense);

module.exports = Expense;
