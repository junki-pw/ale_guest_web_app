import { OrderCart } from "@/domain/order_cart";
import Image from 'next/image'

interface OrderCartProps {
    orderCart: OrderCart
}

export function MenuTile() {
    const redirectToGoogle = () => {
        window.location.href = 'http://localhost:3000/menus';
    };

    return (
        <li
            className="list-none"
        >
            <button
                className='flex h-auto px-4 py-3 border-l-4 border-gray-300 rounded text-left bg-white'
                onClick={redirectToGoogle}
            >
                <div className="">
                    <h1 className="mb-1.5 font-bold text-base line-clamp-1">
                        メニュー名メニュー名メニュー名メニュー名メニュー名メニュー名メニュー名メニュー名メニュー名メニュー名メニュー名メニュー名
                    </h1>
                    <h2 className="mb-1.5 text-sm text-gray-500 line-clamp-2">
                        説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文
                        説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文
                    </h2>
                    <h2 className="text-sm text-orange-600">
                        ¥890
                    </h2>
                </div>
                <Image
                    src="https://placehold.jp/150x150.png"
                    alt="Vercel Logo"
                    className="dark:invert"
                    height={120}
                    width={120}
                    priority
                />
            </button>
        </li>
    );
}
