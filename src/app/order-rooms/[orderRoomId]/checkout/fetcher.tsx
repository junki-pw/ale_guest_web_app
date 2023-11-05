import { getShopById } from "@/repositories/shop";
import { CheckoutState } from "./state";
import { getOrderRoomById } from "@/repositories/order_room";
import { OrderRoom } from "@/domain/order_room";
import { Shop } from "@/domain/shop";
import { OrderCart } from "@/domain/order_cart";
import { OrderRoomUser } from "@/domain/order_room_user";
import { getOrderRoomUsers } from "@/repositories/order_room_user";
import { getMenus } from "@/repositories/shop_menu";
import { ShopMenu } from "@/domain/shop_menu";
import { getOptions } from "@/repositories/menu_option";
import { MenuOption } from "@/domain/shop_option";
import { CoverCharge } from "@/domain/cover_charge";
import { getCoverChargeById } from "@/repositories/cover_charge";
import {
  getOrderCarts,
  streamOrderCartsByOrderRoomId,
} from "@/repositories/order_cart";
import { getCurrentDateTime } from "@/repositories/server_timestamp";
import { streamOrderPaymentsById } from "@/repositories/order_payment";
import { useEffect, useState } from "react";
import { KeyedMutator } from "swr";
import useSWRSubscription from "swr/subscription";

export const checkoutFetcher: (
  orderRoomId: string
) => Promise<CheckoutState> = async (orderRoomId: string) => {
  const orderRoom: OrderRoom = await getOrderRoomById(orderRoomId);
  const shop: Shop = await getShopById(orderRoom.shopId);
  const orderCarts: OrderCart[] = await getOrderCarts(orderRoomId);
  const orderRoomUsers: OrderRoomUser[] = await getOrderRoomUsers(orderRoomId);
  const menus: ShopMenu[] = await getMenus(shop.shopId);
  const options: MenuOption[] = await getOptions(shop.shopId);
  const coverCharge: CoverCharge | null =
    orderRoom.coverChargeId == null
      ? null
      : await getCoverChargeById(shop.shopId, orderRoom.coverChargeId);
  const currentDateTime: Date = await getCurrentDateTime();

  return {
    shop: shop,
    orderRoom: orderRoom,
    orderCarts: orderCarts,
    orderRoomUsers: orderRoomUsers,
    menus: menus,
    options: options,
    customAmount: {},
    isLoading: false,
    paymentMap: {},
    orderCartsContainUnLimitedMenu: [],
    coverCharge: coverCharge,
    checkoutType: "splitBil",
    currentDateTime: currentDateTime,
  };
};

interface UseCheckoutHooksProps {
  data: CheckoutState;
  mutate: KeyedMutator<CheckoutState>;
}

export function useCheckoutHooks({ data, mutate }: UseCheckoutHooksProps) {
  const [paymentMap, setPaymentMap] = useState({});

  useEffect(() => {
    /// OrderCarts の監視
    streamOrderCartsByOrderRoomId(data.orderRoom.orderRoomId, (orderCarts) => {
      mutate({ ...data, orderCarts }, false);
    });

    /// OrderPayments の監視
    streamOrderPaymentsById(data.orderRoom.orderRoomId, (orderPayments) => {
      let paymentMap: {} = {};
      for (const orderPayment of orderPayments) {
        paymentMap = {
          ...paymentMap,
          [`${orderPayment.orderPaymentId}`]: orderPayment,
        };
      }
      setPaymentMap(paymentMap);
    });
  }, []);

  return { paymentMap };
}
