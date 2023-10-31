import { calcOrdersAmount } from "@/services/calc/order_cart";
import { MenusState } from "../state";
import { useRouter } from "next/navigation";

interface MenusBottomButtonProps {
  data: MenusState;
}

const MenusBottomButton = ({ data }: MenusBottomButtonProps) => {
  const router = useRouter();

  const amount: number = calcOrdersAmount({
    orderCarts: data.orderCarts,
    unLimitedMenuOrderCarts: data.unLimitedPlanMenuOrderCarts,
    menus: data.menus,
    orderRoom: data.orderRoom,
    isOrdered: false,
    currentDateTime: data.currentDateTime,
  });

  const index = data.orderCarts.findIndex(
    (orderCart) => orderCart.orderId == null
  );

  if (index == -1) {
    return <div></div>;
  }

  // オーダー数
  let count: number = 0;
  for (var orderCart of data.orderCarts) {
    if (orderCart.orderId == null) {
      count = count + orderCart.userIds.length;
    }
  }

  function handleClicked() {
    router.push("/order-rooms/" + data.orderRoom.orderRoomId + "/order-carts");
  }

  return (
    <div className="fixed bottom-3 px-4 w-full">
      <button
        className="flex py-3 px-4 bg-orange-500 rounded-lg w-full text-white font-bold items-center"
        onClick={handleClicked}
      >
        <h1 className="bg-white text-orange-500 h-6 w-6 rounded-full">
          {count}
        </h1>
        <h1 className="grow mx-3 text-left">カートを見る</h1>
        <div className="flex items-center">
          <h1 className="text-xs mr-1">¥</h1>
          <h5 className="">{amount.toLocaleString()}</h5>
        </div>
      </button>
    </div>
  );
};

export default MenusBottomButton;
