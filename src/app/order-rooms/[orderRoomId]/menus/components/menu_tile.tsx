import { MenuCategory } from "@/domain/menu_category";
import { OrderCart } from "@/domain/order_cart";
import { ShopMenu } from "@/domain/shop_menu";
import { checkThisMenuIsApplyUnLimitedPlan } from "@/services/convert/check_this_menu_is_apply_un_limited_plan";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MenusState } from "../state";
import { convertOptionTexts } from "@/services/convert/option_text";
import { convertIsReducedTaxRate } from "@/services/convert/string";
import { calcMenuAmount } from "@/services/calc/menu";

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
    const path =
      orderCart == null
        ? `/order-rooms/${orderRoomId}/menus/${menu.menuId}`
        : `/order-rooms/${orderRoomId}/order-carts/${orderCart.orderCartId}`;
    router.push(path);
  }

  const isApplyUnLimitedPlan = checkThisMenuIsApplyUnLimitedPlan({
    menu,
    menus: data.menus,
    orderCartsContainedUnLimitedMenu: data.unLimitedPlanMenuOrderCarts,
    currentDateTime: data.currentDateTime,
  });

  const amount: number =
    orderCart == null
      ? calcMenuAmount({
          menu: menu,
          optionList: data.options,
          options: {},
          orderCount: 1,
          shop: data.shop,
          isReducedTaxRate: convertIsReducedTaxRate(data.shop),
          discounts: [],
        })
      : orderCart.orderedMenuAmount!;

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
          {/* メニュー名 */}
          <div className="flex mb-1.5">
            {orderCart != null && (
              <h1 className="flex-none font-bold text-orange-500 mr-1">4 ×</h1>
            )}
            <h1 className="font-bold text-base line-clamp-1">
              {`${orderCart == null ? "" : ""}` + menu.menuName}
            </h1>
          </div>

          {/* 説明文 */}
          <h2 className="mb-1.5 text-sm text-gray-500 line-clamp-2">
            {menu.menuDescription}
          </h2>

          {/* 価格・限定数 */}
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
