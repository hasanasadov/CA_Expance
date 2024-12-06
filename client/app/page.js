import { getCategories } from "@/service/category";

import TableRowElement from "./TableRowElement";

export default async function App() {
  const data = (await getCategories()) ?? [];
  const categories = data.categories;
  return (
    <div>
      <div className="flex gap-4">
        {categories?.map((category) => (
          <div key={category._id}>{category.name}</div>
        ))}
      </div>
      <div className="flex gap-4">
        {categories?.map((category) => (
          <div key={category._id}>
            <TableRowElement categoryId={category._id} />
          </div>
        ))}
      </div>
    </div>
  );
}
