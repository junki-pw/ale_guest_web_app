import { OrderRoom } from "@/domain/order_room";
import { auth } from "@/providers/firebase";
import { updateStatusToCash } from "@/repositories/order_payment";
import { CheckoutStatusState } from "../state";
import { KeyedMutator } from "swr";

interface CheckoutStatuBottomProps {
  data: CheckoutStatusState;
  mutate: KeyedMutator<CheckoutStatusState>;
}

export const CheckoutStatuBottom = ({
  data,
  mutate,
}: CheckoutStatuBottomProps) => {
  const handleUpdateStatusToCash = async () => {
    const confirmMessage =
      "全てのお会計待ちユーザーのステータスを現金支払いに変更しますが、宜しいですか？";
    if (confirm(confirmMessage)) {
      await updateStatusToCash(data.orderPayment, data.payers)
        .then((value) => {
          alert("お会計待ちユーザーを全て現金支払いに変更しました");
          mutate();
        })
        .catch((e) => alert(e));
    }
  };

  if (data.orderRoom.hostId != auth.currentUser?.uid) {
    return <div></div>;
  }

  return (
    <div className="fixed bottom-0 px-4 w-full my-3">
      <button
        className="bg-orange-500 text-white w-full py-3 rounded"
        onClick={handleUpdateStatusToCash}
      >
        お会計待ちユーザーを現金支払いに変更する
      </button>
    </div>
  );
};
