import PrimaryChatSenderInfo from "./message_type/sub/primary_chat_sender_info";


export default function OrderChatOrderPaymentMessage() {
    return (
        <PrimaryChatSenderInfo>
            <div className="flex flex-col items-start">
                <button className="bg-orange-500 px-4 py-3 rounded-lg w-min">
                    <div className="text-white">
                        <h2 className="mb-1">あなたのお支払い金額</h2>
                        <div className="flex items-end">
                            <h1 className="text-5xl font-bold">3,000</h1>
                            <p className="text-2xl">円</p>
                        </div>
                    </div>
                </button>
                <div className="h-1"></div>
                <button className="p-3 bg-orange-500 rounded-lg text-white text-xs">各ユーザーのお会計情報はこちら</button>
            </div>
        </PrimaryChatSenderInfo>
    )
}