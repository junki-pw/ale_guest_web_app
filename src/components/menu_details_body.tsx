import MenuDetailsBottom from "@/app/order-rooms/[orderRoomId]/menus/[menuId]/components/menu_details_bottom";
import MenuDetailsImagePart from "@/app/order-rooms/[orderRoomId]/menus/[menuId]/components/menu_details_image_part";
import { MenuDetailsOptionTiles } from "@/app/order-rooms/[orderRoomId]/menus/[menuId]/components/option_tiles";
import MenuDetailsTitleDescPart from "@/app/order-rooms/[orderRoomId]/menus/[menuId]/components/title_desc_part";
import { MenuDetailsState } from "@/app/order-rooms/[orderRoomId]/menus/[menuId]/state";
import { KeyedMutator } from "swr";

interface MenuDetailsBodyProps {
  data: MenuDetailsState;
  mutate: KeyedMutator<MenuDetailsState>;
}

export default function MenuDetailsBody({
  data,
  mutate,
}: MenuDetailsBodyProps) {
  return (
    <main className="relative pt-4 pb-20">
      {/* 画像 */}
      <MenuDetailsImagePart data={data} />

      {/* メニュー名・説明・料金 */}
      <MenuDetailsTitleDescPart data={data} />

      {/* オプション */}
      {data.menu.optionIds.map((optionId, index) => (
        <MenuDetailsOptionTiles key={index} optionId={optionId} data={data} />
      ))}

      <MenuDetailsBottom data={data} />
    </main>
  );
}
