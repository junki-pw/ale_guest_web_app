"use client";

import { MenuTile } from "./components/menu_tile";
import CategoryTile from "./components/category_tile";
import { v4 as uuidv4 } from "uuid";
import MenusBottomButton from "./components/menus_bottom_button";

export default function MenusPage() {
  const arr = ["リンゴ", "パイナップル", "ペン"];

  const list = [1, 1, 1];

  return (
    <main className="relative pb-40">
      {list.map((fruit) => (
        <div key={uuidv4()}>
          {/* カテゴリー */}
          <CategoryTile key={uuidv4()} />

          {/* メニュータイル */}
          {arr.map((e) => (
            <MenuTile key={uuidv4()} />
          ))}
        </div>
      ))}

      <MenusBottomButton />
    </main>
  );
}
