import React from 'react'
import PrimaryChatSenderInfo from './message_type/sub/primary_chat_sender_info'
import PrimaryChatText from './message_type/sub/primary_chat_text'

export default function OrderChatTextMessage() {
    return (
        <PrimaryChatSenderInfo
            children={
                <PrimaryChatText message={'テキスト'} />
            }
        />
    )
}
