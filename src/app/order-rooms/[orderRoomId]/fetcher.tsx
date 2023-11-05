import { OrderChat } from "@/domain/order_chat";
import { OrderRoom } from "@/domain/order_room";
import { Shop } from "@/domain/shop";
import { auth } from "@/providers/firebase";
import { OrderRoomState } from "./state";
import {
  doc_not_found,
  order_room_closed,
  user_not_joined,
} from "@/constants/error";
import { getOrderRoomById } from "@/repositories/order_room";
import { getShopById } from "@/repositories/shop";
import { getOrderChats, streamOrderChats } from "@/repositories/order_chat";
import { ShopSeat } from "@/domain/shop_seat";
import { getSeatById } from "@/repositories/shop_seat";
import { useEffect } from "react";
import { KeyedMutator } from "swr";
import { streamOrderPaymentsById } from "@/repositories/order_payment";
import { useCurrentUser } from "@/hooks/current_user";
import { getPayerById, getPayers } from "@/repositories/payer";

export const orderRoomFetcher: (
  orderRoomId: string
) => Promise<OrderRoomState> = async (orderRoomId: string) => {
  console.log("orderRoomFetcher 発火");
  const uid = auth.currentUser?.uid;
  if (uid == undefined) {
    throw doc_not_found;
  }

  /// OrderRoom を取得する
  const orderRoom: OrderRoom = await getOrderRoomById(orderRoomId);

  // エラー処理
  if (orderRoom == null) {
    throw doc_not_found;
  } else if ((orderRoom.userIds as any[]).indexOf(uid) == -1) {
    if (orderRoom.isClosed) {
      throw order_room_closed;
    }
    throw user_not_joined;
  }

  //todo Shop を取得
  const shop: Shop = await getShopById(orderRoom.shopId);

  /// OrderChats 取得
  const orderChats: OrderChat[] = await getOrderChats(orderRoom.orderRoomId);
  console.log("orderChats length: " + orderChats.length);

  /// unRead count を0にする
  const seat: ShopSeat = await getSeatById(shop.shopId, orderRoom.seatId);

  return {
    orderRoom: orderRoom,
    shop: shop,
    orderChats: orderChats,
    seat: seat,
    orderPaymentMap: {},
    payerMap: {},
    checkoutPayersMap: {},
  };
};

/// 一番下にスクロール
function scrollBottom() {
  var element = document.documentElement;
  var bottom = element.scrollHeight - element.clientHeight;
  window.scroll(0, bottom);
}

// Sleep関数
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useOrderRoomHooks(
  data: OrderRoomState,
  mutate: KeyedMutator<OrderRoomState>
) {
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    scrollBottom();

    streamOrderChats(data.orderRoom.orderRoomId, async (orderChats) => {
      mutate({ ...data, orderChats: orderChats }, false);
      // リッスンした時にも一番下にスクロールされる
      await sleep(500);
      scrollBottom();
    });

    streamOrderPaymentsById(
      data.orderRoom.orderRoomId,
      async (orderPayments) => {
        console.log("orderPaymentsをリッスン");

        let orderPaymentMap: {} = {};
        for (const orderPayment of orderPayments) {
          orderPaymentMap = {
            ...orderPaymentMap,
            [`${orderPayment.orderPaymentId}`]: orderPayment,
          };
        }

        let payerMap: {} = {};
        for (const orderPayment of orderPayments) {
          await getPayerById(orderPayment.orderPaymentId, currentUser!.userId)
            .then((value) => {
              payerMap = {
                ...payerMap,
                [`${orderPayment.orderPaymentId}`]: value,
              };
            })
            .catch((e) => {
              console.log(
                "payer データが見つかりませんでした: " +
                  orderPayment.orderPaymentId
              );
            });
        }

        let payersWhoCheckoutPayment: {} = {};
        for (const payment of orderPayments) {
          if (
            payment.status == "completed" &&
            (data.checkoutPayersMap as any)[payment.orderPaymentId] == null
          ) {
            await getPayers(payment.orderPaymentId).then((value) => {
              payersWhoCheckoutPayment = {
                ...payersWhoCheckoutPayment,
                [`${payment.orderPaymentId}`]: value,
              };
            });
          }
        }

        mutate(
          {
            ...data,
            orderPaymentMap,
            payerMap,
            checkoutPayersMap: {
              ...data.checkoutPayersMap,
              ...payersWhoCheckoutPayment,
            },
          },
          false
        );
      }
    );
  }, []);
}
