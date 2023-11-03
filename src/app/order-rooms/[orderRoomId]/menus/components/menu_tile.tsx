import { MenuCategory } from "@/domain/menu_category";
import { OrderCart } from "@/domain/order_cart";
import { ShopMenu } from "@/domain/shop_menu";
import { checkThisMenuIsApplyUnLimitedPlan } from "@/services/convert/check_this_menu_is_apply_un_limited_plan";
import { checkThisOrderCartIsApplyUnLimitedPlanProvider } from "@/services/convert/check_this_order_cart_is_apply_un_limited_plan";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MenusState } from "../state";
import { convertOptionTexts } from "@/services/convert/option_text";

interface OrderCartProps {
  orderCart: OrderCart | null;
  menu: ShopMenu;
  category: MenuCategory;
  orderRoomId: string;
  data: MenusState;
}

export function MenuTile({
  menu,
  orderCart,
  category,
  orderRoomId,
  data,
}: OrderCartProps) {
  const router = useRouter();
  /// データを含まない場合はスルー
  if (!(menu.categoryIds as any[]).includes(category.categoryId)) {
    return <div></div>;
  }

  function handleClicked() {
    router.push(`/order-rooms/${orderRoomId}/menus/${menu.menuId}`);
  }

  const isApplyUnLimitedPlan = checkThisMenuIsApplyUnLimitedPlan({
    menu,
    menus: data.menus,
    orderCartsContainedUnLimitedMenu: data.unLimitedPlanMenuOrderCarts,
    currentDateTime: data.currentDateTime,
  });

  const amount: number =
    orderCart == null ? menu.price : orderCart.orderedMenuAmount!;

  // 売り切れチェック
  const soldOut: boolean =
    menu.isLimited && menu.defaultMenuCount - menu.todayOrderedCount <= 0;

  const optionTexts: string | null =
    orderCart == null
      ? null
      : convertOptionTexts({
          orderCart,
          menus: data.menus,
        });

  return (
    <li className="list-none">
      <button
        className={`flex w-full justify-between h-auto px-4 py-3 text-left bg-white ${
          orderCart != null && "border-l-4 border-orange-400"
        }`}
        onClick={handleClicked}
      >
        <div>
          <h1 className="mb-1.5 font-bold text-base line-clamp-1">
            {menu.menuName}
          </h1>
          <h2 className="mb-1.5 text-sm text-gray-500 line-clamp-2">
            {menu.menuDescription}
          </h2>
          <div className="flex">
            <h2
              className={`text-sm ${
                isApplyUnLimitedPlan ? "text-green-500" : "text-orange-600"
              }`}
            >
              {isApplyUnLimitedPlan
                ? "放題プラン適用"
                : `¥${amount.toLocaleString()}`}
            </h2>
            {menu.isLimited && (
              <h1 className="text-sm ml-3 font-bold text-rose-600">
                {soldOut
                  ? "売り切れ"
                  : `残り{menu.defaultMenuCount - menu.todayOrderedCount}個`}
              </h1>
            )}
          </div>
        </div>
        {menu.menuImageUrl != null && (
          <Image
            className="ml-3 rounded-md"
            src={menu.menuImageUrl}
            alt="menu image url"
            height={100}
            width={100}
            objectFit="fit"
            priority
          ></Image>
        )}
      </button>
      {optionTexts != null && optionTexts.length != 0 && (
        <h1 className="text-xs font-bold px-4 py-2 text-orange-500 bg-orange-100">
          {optionTexts}
        </h1>
      )}
    </li>
  );
}
