"use server";

export const getExpenses = async () => {
  const response = await fetch("http://localhost:3000/expense");
  const data = response.json();
  return data || [];
};

export const getExpenseByCategoryId = async (id) => {
  const response = await fetch(
    `http://localhost:3000/expense/bycategory/${id}`
  );
  const data = response.json();
  return data || [];
};
