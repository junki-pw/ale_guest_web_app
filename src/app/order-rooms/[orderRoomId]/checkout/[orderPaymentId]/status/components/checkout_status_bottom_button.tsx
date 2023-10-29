import { OrderRoom } from "@/domain/order_room";
import { auth } from "@/providers/firebase";
import { updateStatusToCash } from "@/repositories/order_payment";
import { CheckoutStatusState } from "../state";

interface CheckoutStatuBottomProps {
  data: CheckoutStatusState;
}

export const CheckoutStatuBottom = ({ data }: CheckoutStatuBottomProps) => {
  const handleUpdateStatusToCash = async () => {
    await updateStatusToCash(data.orderPayment, data.payers);
  };

  if (data.orderRoom.hostId != auth.currentUser?.uid) {
    return <div></div>;
  }

  return (
    <div className="fixed w-full bottom-4 left-4">
      <button
        className="bg-orange-500 text-white w-full py-3 rounded"
        onClick={handleUpdateStatusToCash}
      >
        お会計待ちユーザーを現金支払いに変更する
      </button>
    </div>
  );
};
