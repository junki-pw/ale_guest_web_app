import OrderChatJoinTile from "./components/order_chat_join_tile";
import { OrderChat } from "@/domain/order_chat";
import OrderChatFirstMessage from "./components/message_type/order_chat_first_message";
import OrderChatTextMessage from "./components/order_chat_text_message";
import OrderChatCheckoutMessage from "./components/order_chat_checkout_message";
import OrderChatOrderPaymentMessage from "./components/order_chat_order_payment_message";
import { v4 as uuidv4 } from 'uuid';

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
                {orderChats.map((event) => <ChatTiles key={uuidv4()} orderChat={event} />)}
            </div>
        </main >
    );
}

export interface OrderChatProps {
    orderChat: OrderChat
}

function ChatTiles({ orderChat }: OrderChatProps) {

    if (orderChat.messageType == 'join') {
        return <OrderChatJoinTile key={uuidv4()} />;
    }

    switch (orderChat.messageType) {
        case 'first':
            return <OrderChatFirstMessage key={uuidv4()} />;
        case 'text':
            return <OrderChatTextMessage key={uuidv4()} />;
        case 'orderPayment':
            return <OrderChatOrderPaymentMessage key={uuidv4()} />;
        case 'checkout':
            return <OrderChatCheckoutMessage key={uuidv4()} />;
    }
}
