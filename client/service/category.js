"use server";

export const getCategories = async () => {
  const response = await fetch("http://localhost:3000/category");
  const data = response.json();
  return data || [];
};
