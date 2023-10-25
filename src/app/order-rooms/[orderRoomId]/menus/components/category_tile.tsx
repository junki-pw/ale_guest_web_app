import { MenuCategory } from "@/domain/menu_category";
import React from "react";

interface CategoryTileProps {
  category: MenuCategory;
}

const CategoryTile = ({ category }: CategoryTileProps) => {
  return (
    <h1 className="mx-4 mb-3 mt-4 font-bold line-clamp-1 text-xl">
      {category.categoryName}
    </h1>
  );
};

export default CategoryTile;
