import React from "react";
import { MenuDetailsState } from "../state";

interface MenuDetailsTitleDescPartProps {
  data: MenuDetailsState;
}

export default function MenuDetailsTitleDescPart({
  data,
}: MenuDetailsTitleDescPartProps) {
  return (
    <div className="px-4">
      <h1 className="font-bold">{data.menu.menuName}</h1>
      <p className="mb-3 mt-1 text-gray-400 text-xs">
        {data.menu.menuDescription}
      </p>
      <h2 className="mb-4 text-xl text-orange-500 font-bold">
        ¥ {data.menu.price}
      </h2>
    </div>
  );
}
