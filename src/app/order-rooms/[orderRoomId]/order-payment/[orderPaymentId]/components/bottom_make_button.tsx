import { makePayment } from "@/repositories/order_payment";

interface Props {
  orderPaymentId: string;
}

export default function BottomMakeButton({ orderPaymentId }: Props) {
  // お支払いを確定
  async function handleMakePayment() {
    const alertMessage: string =
      "お支払いを確定しても宜しいですか？\n後から変更したい場合はキャンセルできます。";
    if (window.confirm(alertMessage)) {
      await makePayment(orderPaymentId).catch((e) => {
        alert(e);
      });
    }
  }

  return (
    <button
      className="fixed bottom-3 px-4 w-full py-3 bg-orange-400 rounded-md font-bold text-white"
      onClick={handleMakePayment}
    >
      お支払いを確定する
    </button>
  );
}
