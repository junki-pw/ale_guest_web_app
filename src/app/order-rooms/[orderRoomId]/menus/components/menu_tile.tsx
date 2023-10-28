import { menuNoImageUrl } from "@/constants/urls";
import { MenuCategory } from "@/domain/menu_category";
import { OrderCart } from "@/domain/order_cart";
import { ShopMenu } from "@/domain/shop_menu";
import Image from "next/image";
import Link from "next/link";

interface OrderCartProps {
  orderCarts: OrderCart[];
  menu: ShopMenu;
  category: MenuCategory;
  orderRoomId: string;
}

export function MenuTile({
  menu,
  orderCarts,
  category,
  orderRoomId,
}: OrderCartProps) {
  /// データを含まない場合はスルー
  if (!(menu.categoryIds as any[]).includes(category.categoryId)) {
    return <div></div>;
  }

  return (
    <li className="list-none">
      <Link
        href={`/order-rooms/${orderRoomId}/menus/${menu.menuId}`}
        className="flex h-auto px-4 py-3 border-l-4 border-gray-300 rounded text-left bg-white"
      >
        <div className="grow">
          <h1 className="mb-1.5 font-bold text-base line-clamp-1">
            {menu.menuName}
          </h1>
          <h2 className="mb-1.5 text-sm text-gray-500 line-clamp-2">
            {menu.menuDescription}
          </h2>
          <h2 className="text-sm text-orange-600">¥890</h2>
        </div>
        <Image
          className="ml-3 rounded-md"
          src={menu.menuImageUrl ?? menuNoImageUrl}
          alt="menu image url"
          height={100}
          width={100}
          objectFit="fit"
          priority
        ></Image>
      </Link>
    </li>
  );
}
