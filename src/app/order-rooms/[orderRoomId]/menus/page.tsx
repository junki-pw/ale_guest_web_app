"use client";

import { MenuTile } from "./components/menu_tile";
import CategoryTile from "./components/category_tile";
import MenusBottomButton from "./components/menus_bottom_button";
import useSWR, { KeyedMutator } from "swr";
import { menusFetcher } from "./fetcher";
import { MenusState } from "./state";
import { streamOrderCartsByOrderRoomId } from "@/repositories/order_cart";
import { useEffect } from "react";
import { MenuCategory } from "@/domain/menu_category";
import { ShopMenu } from "@/domain/shop_menu";
import MenusUnLimitedMenuTiles from "./components/un_limited_menu_tiles";
import MenusCategoryTiles from "./components/category_tiles";
import { useMenusHooks } from "./hooks";

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

  return <_Body data={data} mutate={mutate} />;
}

interface BodyProps {
  data: MenusState;
  mutate: KeyedMutator<MenusState>;
}

function _Body({ data, mutate }: BodyProps) {
  const { orderCarts } = useMenusHooks(data.orderRoom.orderRoomId);

  useEffect(() => {
    mutate({ ...data, orderCarts }, false);
  }, [orderCarts]);

  const categories: MenuCategory[] = [...data.categories].sort(
    (a, b) => a.categoryIndex - b.categoryIndex
  );

  return (
    <main className="relative pb-40 pt-[62px]">
      {/* カテゴリーs */}
      <MenusCategoryTiles data={data} />

      {/* 放題プラン */}
      <MenusUnLimitedMenuTiles data={data} />

      {/* カテゴリー・メニュー表 */}
      {categories.map((category, index) => {
        const containedIndex = data.menus.findIndex((element) =>
          (element.categoryIds as any).includes(category.categoryId)
        );

        if (containedIndex != -1) {
          return (
            <div key={index} id={category.categoryId}>
              {/* カテゴリー */}
              <CategoryTile key={category.categoryId} category={category} />

              {/* メニュータイル */}
              {data.menus.map((menu, menuIndex) => {
                return (
                  <MenuTileWithOrderCart
                    key={menuIndex}
                    menu={menu}
                    category={category}
                    data={data}
                  />
                );
              })}
            </div>
          );
        }
      })}

      <MenusBottomButton data={data} />
    </main>
  );
}

type MenuTileWithOrderCartProps = {
  menu: ShopMenu;
  category: MenuCategory;
  data: MenusState;
};

function MenuTileWithOrderCart({
  menu,
  category,
  data,
}: MenuTileWithOrderCartProps) {
  return (
    <div>
      <MenuTile
        menu={menu}
        orderCart={null}
        category={category}
        orderRoomId={data.orderRoom.orderRoomId}
        data={data}
      />
      {data.orderCarts.map((orderCart, index) => {
        if (orderCart.menuId != menu.menuId || orderCart.orderId != null) {
          return <div key={orderCart.orderCartId}></div>;
        }

        return (
          <MenuTile
            key={orderCart.orderCartId}
            menu={menu}
            orderCart={orderCart}
            category={category}
            orderRoomId={data.orderRoom.orderRoomId}
            data={data}
          />
        );
      })}
    </div>
  );
}
