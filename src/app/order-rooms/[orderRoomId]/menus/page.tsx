"use client";

import { MenuTile } from "./components/menu_tile";
import CategoryTile from "./components/category_tile";
import MenusBottomButton from "./components/menus_bottom_button";
import useSWR from "swr";
import { menusFetcher } from "./fetcher";
import { useMenusHooks } from "./hooks";
import { v4 as uuidv4 } from "uuid";

interface MenusProps {
  params: {
    orderRoomId: string;
  };
}

export default function MenusPage(params: MenusProps) {
  const orderRoomId = params.params.orderRoomId;
  const { data, isLoading, error } = useSWR(
    `order-rooms/${orderRoomId}/menus`,
    () => menusFetcher(orderRoomId)
  );

  const { orderCarts } = useMenusHooks(orderRoomId);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error || data == undefined) {
    return <div>Error...</div>;
  }

  return (
    <main className="relative pb-40">
      {data.categories.map((category) => (
        <div key={category.categoryId}>
          {/* カテゴリー */}
          <CategoryTile key={category.categoryId} category={category} />

          {/* メニュータイル */}
          {data.menus.map((menu) => (
            <MenuTile
              key={uuidv4()}
              menu={menu}
              orderCarts={orderCarts}
              category={category}
              orderRoomId={orderRoomId}
            />
          ))}
        </div>
      ))}

      <MenusBottomButton />
    </main>
  );
}
