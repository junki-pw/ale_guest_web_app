import Image from "next/image";
import PrimaryChatText from "./primary_chat_text";
import { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode
}

export default function PrimaryChatSenderInfo({ children }: LayoutProps) {
    return (
        <div className="mb-4 flex px-4">
            <div style={{ position: "relative", height: "32px", widows: "32px" }}>
                <Image
                    className="rounded-full"
                    src={'https://placehold.jp/120x120.png'}
                    alt="order-chat-icon"
                    height={32}
                    width={32}
                    priority
                ></Image>
            </div>
            <div className="grow ml-2">
                <div className="flex mb-1">
                    <h1 className="text-xs mr-2">ユーザー名</h1>
                    <h2 className="text-xs mr-2 text-gray-400">役職</h2>
                    <h2 className="text-xs text-gray-400">12月30日 11:30</h2>
                </div>
                {children}
            </div>
        </div>
    );
}
