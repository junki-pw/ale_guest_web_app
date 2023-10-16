import Image from "next/image";
import { useWindowSize } from "../../menus/[menuId]/page";
import Link from "next/link";

export default function CheckoutUsersPaymentPart() {

    return (
        <div className="mt-4">
            <div className="px-4">
                <h1 className="font-bold mb-4">各メンバーのお会計</h1>
                <div className="flex-wrap">
                    <_Button />
                    <_Button />
                    <_Button />
                    <_Button />
                </div>
            </div>


            <button className="flex w-full items-center px-4 py-1.5">
                <Image
                    className="rounded-full mr-1"
                    src={'https://placehold.jp/120x120.png'}
                    alt=""
                    height={32}
                    width={32}
                ></Image>
                <h1 className="ml-1 mr-3 grow text-left">ユーザー名</h1>
                <h1 className="font-bold mr-3">¥12,900</h1>
                <p className="ml-1 text-gray-400">変更</p>
            </button>
            <p className="mt-2.5 text-green-500 px-4">正確な金額です。</p>
            <div className="w-full bg-gray-200 h-[6px] mt-4"></div>
        </div>
    )
}

function _Button() {
    return (
        <button className="bg-gray-100 text-gray-400 py-1.5 px-3 mr-2 rounded-full">割り勘</button>
    );
}