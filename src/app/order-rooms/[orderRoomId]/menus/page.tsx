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
  useEffect(() => {
    streamOrderCartsByOrderRoomId(data.orderRoom.orderRoomId, (orderCarts) => {
      mutate({ ...data, orderCarts: orderCarts }, false);
    });
  }, []);

  const categories: MenuCategory[] = [...data.categories].sort(
    (a, b) => a.categoryIndex - b.categoryIndex
  );

  const list = [1, 1, 1, 1];

  return (
    <main className="relative pb-40">
      {categories.map((category, index) => {
        const containedIndex = data.menus.findIndex((element) =>
          (element.categoryIds as any).includes(category.categoryId)
        );

        if (containedIndex == -1) {
          return <div key={index}></div>;
        }

        return (
          <div key={index}>
            {/* カテゴリー */}
            <CategoryTile key={category.categoryId} category={category} />

            {/* メニュータイル */}
            {data.menus.map((menu, menuIndex) => {
              return (
                <div key={menuIndex}>
                  <MenuTile
                    menu={menu}
                    orderCart={null}
                    category={category}
                    orderRoomId={data.orderRoom.orderRoomId}
                  />
                  {data.orderCarts.map((orderCart, index) => {
                    if (
                      orderCart.menuId != menu.menuId ||
                      orderCart.orderId != null
                    ) {
                      return <div key={orderCart.orderCartId}></div>;
                    }

                    return (
                      <MenuTile
                        key={orderCart.orderCartId}
                        menu={menu}
                        orderCart={orderCart}
                        category={category}
                        orderRoomId={data.orderRoom.orderRoomId}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      })}

      <MenusBottomButton data={data} />
    </main>
  );
}
