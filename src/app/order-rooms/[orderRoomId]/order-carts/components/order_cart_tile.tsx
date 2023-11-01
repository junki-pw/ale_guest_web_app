import React from "react";
import Image from "next/image";
import { noImageUrl } from "@/constants/urls";
import PrimaryQuantityButton from "@/primary/buttons/quantity_button";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OrderCart } from "@/domain/order_cart";
import { OrderCartState } from "../state";
import { ShopMenu } from "@/domain/shop_menu";
import { searchMenu } from "@/services/methods/search";
import { convertOptionTexts } from "@/services/convert/option_text";
import {
  deleteOrderCart,
  updateOrderCartUserIds,
} from "@/repositories/order_cart";
import { useCurrentUser } from "@/hooks/current_user";

interface OrderCartTileProps {
  orderCart: OrderCart;
  data: OrderCartState;
}

export default function OrderCartTile({ data, orderCart }: OrderCartTileProps) {
  const { currentUser } = useCurrentUser();

  if (orderCart.orderId != null) {
    return <div></div>;
  }

  const menu: ShopMenu = searchMenu(data.menus, orderCart.menuId);
  const optionTexts = convertOptionTexts({ orderCart, menus: data.menus });

  const handleUpdateQuantity = async (isAdd: boolean) => {
    if (orderCart.userIds.length <= 1 && !isAdd) {
      // 削除処理
      handleAlertDeleteDialog();
      return;
    }

    // 追加 or 減らす処理
    await updateOrderCartUserIds({
      isAdd,
      orderCartId: orderCart.orderCartId,
      currentUserId: currentUser!.userId,
      shop: data.shop,
      menus: data.menus,
      options: data.options,
    });
  };

  function handleAlertDeleteDialog() {
    if (confirm("カートを削除しますか")) {
      handleDeleteOrderCart();
    }
  }

  async function handleDeleteOrderCart() {
    // 削除処理
    await deleteOrderCart({ currentUser: currentUser!, orderCart }).catch((e) =>
      alert(e)
    );
  }

  return (
    <div>
      <div className="px-4 py-3">
        <div className="flex mb-3 justify-between">
          <div className="block">
            <h1 className="font-bold text-base">
              {orderCart.customMenuName ?? menu.menuName}
            </h1>
            <p className="my-1 text-sm">{optionTexts}</p>
            <p className="mt-0.5 text-orange-400">
              ¥ {orderCart.orderedMenuAmount?.toLocaleString()}
            </p>
          </div>
          {menu.menuImageUrl == null ? (
            <div></div>
          ) : (
            <div className="ml-3 relative h-24 w-32 rounded-md">
              <Image
                className="rounded-md"
                src={menu.menuImageUrl ?? noImageUrl}
                alt={"メニュー画像"}
                fill
              ></Image>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <PrimaryQuantityButton
            addClicked={() => handleUpdateQuantity(true)}
            minusClicked={() => handleUpdateQuantity(false)}
            amount={orderCart.userIds.length}
          />
          <div className="flex h-8 w-8 content-center items-center justify-center bg-gray-100 rounded-full">
            <FontAwesomeIcon
              icon={faTrash}
              onClick={handleAlertDeleteDialog}
              className="h-[16px] text-gray-500"
            />
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-200 h-[0.5px]"></div>
    </div>
  );
}
