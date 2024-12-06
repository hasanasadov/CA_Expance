import { getExpenseByCategoryId } from "@/service/expense";
import React from "react";

const TableRowElement = async ({ categoryId }) => {
  const data = await getExpenseByCategoryId(categoryId);
  const expence = data.data ?? [];

  console.log(expence);
  return (
    <div className="flex gap-4">
      {expence?.map((expence) => (
        <div key={expence._id}>{expence.price}</div>
      ))}
    </div>
  );
};

export default TableRowElement;
