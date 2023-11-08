import { makePayment } from "@/repositories/order_payment";
import { useRouter } from "next/navigation";

interface Props {
  orderPaymentId: string;
}

export default function BottomMakeButton({ orderPaymentId }: Props) {
  const router = useRouter();

  // お支払いを確定
  async function handleMakePayment() {
    const alertMessage: string =
      "お支払いを確定しても宜しいですか？\n後から変更したい場合はキャンセルできます。";
    if (window.confirm(alertMessage)) {
      await makePayment(orderPaymentId)
        .then((value) => {
          alert("お会計を送信しました");
          router.back();
        })
        .catch((e) => alert(e));
    }
  }

  return (
    <div className="fixed bottom-0 w-full px-4 py-3">
      <button
        className="bg-orange-400 rounded-md font-bold text-white w-full py-3"
        onClick={handleMakePayment}
      >
        お支払いを確定する
      </button>
    </div>
  );
}
