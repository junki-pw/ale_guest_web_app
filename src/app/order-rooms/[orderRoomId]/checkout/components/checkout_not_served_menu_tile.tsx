import Link from "next/link";

export default function CheckoutNotServedMenuTile() {
    return (
        <Link href={'/'}>
            <div className="px-4 py-3">
                <h1 className="mb-1 font-bold">タイトル</h1>
                <p className="text-xs text-gray-400">オプション , オプション , オプション , オプション , オプション</p>
            </div>
        </Link>
    )
}
