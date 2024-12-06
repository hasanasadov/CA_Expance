const express = require("express");
require("./config/db.mjs");

const categoryRouter = require("./routes/category.js");
const expenseRouter = require("./routes/expense.js");
const app = express();
app.use(express.json());

app.use("/category", categoryRouter);

app.use("/expense", expenseRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
