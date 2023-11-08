import React, { useState } from "react";
import { MenusState } from "../state";
import Link from "next/link";

interface MenusCategoryTilesProps {
  data: MenusState;
}

export default function MenusCategoryTiles({ data }: MenusCategoryTilesProps) {
  const categories = [...data.categories].filter((category) => {
    const index = data.menus.findIndex((menu) =>
      (menu.categoryIds as any).includes(category.categoryId)
    );
    return index != -1;
  });

  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categories[0].categoryId
  );

  function handleUpdateSelectedCategoryId(categoryId: string) {
    setSelectedCategoryId(categoryId);
  }

  return (
    <div>
      <div className="fixed top-0 py-3 border-b-2 border-gray-100 flex items-center bg-white w-full overflow-x-auto">
        {categories.map((category, index) => {
          const isSelected: boolean = category.categoryId == selectedCategoryId;
          const isFirstCategory =
            category.categoryId == categories[0].categoryId;

          return (
            <Link
              key={index}
              href={`#${category.categoryId}`}
              onClick={() =>
                handleUpdateSelectedCategoryId(category.categoryId)
              }
              className={`
                flex-none mr-3 px-3 py-1.5 rounded text-xm
                ${isFirstCategory ? "ml-3" : ""}
                ${isSelected ? "text-orange-500 bg-orange-50" : "text-gray-500"}
              `}
            >
              {category.categoryName}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
