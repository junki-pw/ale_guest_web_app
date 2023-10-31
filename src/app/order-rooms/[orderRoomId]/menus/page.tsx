"use client";

import { MenuTile } from "./components/menu_tile";
import CategoryTile from "./components/category_tile";
import MenusBottomButton from "./components/menus_bottom_button";
import useSWR, { KeyedMutator } from "swr";
import { menusFetcher } from "./fetcher";
import { useMenusHooks } from "./hooks";
import { MenusState } from "./state";

interface MenusProps {
  params: {
    orderRoomId: string;
  };
}

export default function MenusPage(params: MenusProps) {
  const orderRoomId = params.params.orderRoomId;
  const { data, isLoading, error, mutate } = useSWR(
    `order-rooms/${orderRoomId}/menus`,
    () => menusFetcher(orderRoomId)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error || data == undefined) {
    return <div>Error...</div>;
  }

  return <Body data={data} mutate={mutate} />;
}

interface BodyProps {
  data: MenusState;
  mutate: KeyedMutator<MenusState>;
}

function Body({ data, mutate }: BodyProps) {
  const { orderCarts } = useMenusHooks(data.orderRoom.orderRoomId);
  return (
    <main className="relative pb-40">
      {data.categories.map((category) => (
        <div key={category.categoryId}>
          {/* カテゴリー */}
          <CategoryTile key={category.categoryId} category={category} />

          {/* メニュータイル */}
          {data.menus.map((menu, index) => (
            <MenuTile
              key={index}
              menu={menu}
              orderCarts={orderCarts}
              category={category}
              orderRoomId={data.orderRoom.orderRoomId}
            />
          ))}
        </div>
      ))}

      <MenusBottomButton data={data} />
    </main>
  );
}
