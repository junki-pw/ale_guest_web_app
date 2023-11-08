import React from "react";
import { MenusState } from "../state";
import { OrderCart } from "@/domain/order_cart";
import { ShopMenu } from "@/domain/shop_menu";
import { searchMenu } from "@/services/methods/search";

interface MenusUnLimitedMenuTilesProps {
  data: MenusState;
}

export default function MenusUnLimitedMenuTiles({
  data,
}: MenusUnLimitedMenuTilesProps) {
  const orderCartsContainedUnLimitedPlan: OrderCart[] = [
    ...data.orderCarts,
  ].filter((orderCart) => orderCart.unLimitedPlanStartAt !== null);

  return (
    <div className="p-4">
      {orderCartsContainedUnLimitedPlan.map((orderCart, index) => {
        const menu: ShopMenu = searchMenu(data.menus, orderCart.menuId);
        console.log(orderCart.orderCartId);

        // 時間帯によっての状態を変化させる
        const startAt: Date = orderCart.unLimitedPlanStartAt!;
        const lastOrderAt = new Date(
          startAt.getFullYear(),
          startAt.getMonth(),
          startAt.getDate(),
          startAt.getHours(),
          startAt.getMinutes() +
            menu.durationOfStayMinutes -
            menu.lastOrderTimeMinutes +
            orderCart.unLimitedPlanExtraTime
        );

        const endAt: Date = new Date(
          startAt.getFullYear(),
          startAt.getMonth(),
          startAt.getDate(),
          startAt.getHours(),
          startAt.getMinutes() +
            menu.durationOfStayMinutes +
            orderCart.unLimitedPlanExtraTime
        );

        let message: string;
        let textColor: string;
        let borderColor: string;

        if (data.currentDateTime <= lastOrderAt) {
          const timeDifferenceInMilliseconds = Math.abs(
            data.currentDateTime.getTime() - lastOrderAt.getTime()
          );

          // 時間差
          const timeDifferenceInMinutes = Math.floor(
            timeDifferenceInMilliseconds / (1000 * 60)
          );

          // ラストオーダーまで〇〇分
          message = `ラストオーダーまで${timeDifferenceInMinutes}分`;
          textColor = "text-green-500";
          borderColor = "border-green-500";
        } else if (data.currentDateTime <= endAt) {
          const timeDifferenceInMilliseconds = Math.abs(
            data.currentDateTime.getTime() - endAt.getTime()
          );

          // 時間差
          const timeDifferenceInMinutes = Math.floor(
            timeDifferenceInMilliseconds / (1000 * 60)
          );

          // 終了まで〇〇分
          message = `終了まで${timeDifferenceInMinutes}分`;
          textColor = "text-orange-500";
          borderColor = "border-orange-500";
        } else {
          // 終了
          message = `放題プラン終了`;
          textColor = "text-gray-500";
          borderColor = "border-gray-500";
        }

        return (
          <div
            key={index}
            className={`
              rounded-md border-2 px-2 py-3 
              ${borderColor}
              ${textColor}
              ${
                orderCartsContainedUnLimitedPlan.length - 1 == index
                  ? ""
                  : "mb-3"
              }
           `}
          >
            <h1 className="mb-1 font-base font-bold">{menu.menuName}</h1>
            <p className={`text-sm ${textColor}`}>{message}</p>
          </div>
        );
      })}
    </div>
  );
}
