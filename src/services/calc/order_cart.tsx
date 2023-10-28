import { OrderCart } from "@/domain/order_cart";
import { convertCorrects } from "../convert/number";
import { ShopMenu } from "@/domain/shop_menu";
import { MenuOption } from "@/domain/shop_option";
import { OrderRoom } from "@/domain/order_room";
import { Shop } from "@/domain/shop";
import { checkThisOrderCartIsApplyUnLimitedPlanProvider } from "../convert/check_this_order_cart_is_apply_un_limited_plan";

/// OrderCart 単体の合計金額
/// 既に外税・内税や軽減税率などを計算し終えている
export const calcOrderCartAmount = (orderCart: OrderCart) => {
  const orderCartAmount =
    (orderCart.orderedMenuAmount ?? 0) + orderCart.unLimitedPlanExtraCharge;
  return convertCorrects(orderCartAmount, orderCart.corrects);
};

interface CalcOrdersAmountProps {
  orderCarts: OrderCart[];
  unLimitedMenuOrderCarts: OrderCart[];
  menus: ShopMenu[];
  orderRoom: OrderRoom;
  isOrdered: boolean;
  currentDateTime: Date | null;
}

/// オーダーメニューsの合計金額
export const calcOrdersAmount: ({
  orderCarts,
  unLimitedMenuOrderCarts,
  menus,
  orderRoom,
  isOrdered,
  currentDateTime,
}: CalcOrdersAmountProps) => number = ({
  orderCarts,
  unLimitedMenuOrderCarts,
  menus,
  orderRoom,
  isOrdered,
  currentDateTime,
}: CalcOrdersAmountProps) => {
  return orderCarts.reduce(
    (previousValue: number, orderCart: OrderCart): number => {
      if (
        orderCart.isDeleted ||
        orderCart.orderRoomId != orderRoom.orderRoomId
      ) {
        return previousValue;
      } else if (isOrdered && orderCart.orderId == null) {
        /// カートの場面で注文されてる場合
        return previousValue;
      } else if (!isOrdered && orderCart.orderId != null) {
        /// 注文済みの画面でカートの場合
        return previousValue;
      }

      /// 放題プランに該当するかチェックする
      const isApplyUnLimitedPlan: boolean =
        checkThisOrderCartIsApplyUnLimitedPlanProvider({
          orderCart: orderCart,
          unLimitedPlanOrderCarts: unLimitedMenuOrderCarts,
          menus: menus,
          currentDateTime: currentDateTime,
        });

      if (isApplyUnLimitedPlan) {
        return previousValue;
      }

      return previousValue + calcOrderCartAmount(orderCart);
    },
    0
  );
};
