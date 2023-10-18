import OrderChatJoinTile from "./components/order_chat_join_tile";
import { OrderChat } from "@/domain/order_chat";
import OrderChatFirstMessage from "./components/message_type/order_chat_first_message";
import OrderChatTextMessage from "./components/order_chat_text_message";
import OrderChatCheckoutMessage from "./components/order_chat_checkout_message";
import OrderChatOrderPaymentMessage from "./components/order_chat_order_payment_message";

export default function OrderRoomPage() {
    const orderChats: OrderChat[] = [
        {
            message: null,
            messageType: 'join'
        },
        {
            message: 'オーダーを送信しました',
            messageType: 'text'
        },
        {
            message: null,
            messageType: 'first'
        },
        {
            message: null,
            messageType: 'orderPayment'
        },
        {
            message: null,
            messageType: 'checkout'
        },
    ];

    return (
        <main className="h-full">
            <div className="grow flex flex-col">
                {orderChats.map((event) => <ChatTiles orderChat={event} />)}
            </div>
        </main >
    );
}

export interface OrderChatProps {
    orderChat: OrderChat
}

function ChatTiles({ orderChat }: OrderChatProps) {

    if (orderChat.messageType == 'join') {
        return <OrderChatJoinTile />;
    }

    switch (orderChat.messageType) {
        case 'first':
            return <OrderChatFirstMessage />;
        case 'text':
            return <OrderChatTextMessage />;
        case 'orderPayment':
            return <OrderChatOrderPaymentMessage />;
        case 'checkout':
            return <OrderChatCheckoutMessage />;
    }
}
