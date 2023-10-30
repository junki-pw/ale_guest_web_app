import { searchMenu, searchOption } from "@/services/methods/search";
import React from "react";
import useSWR from "swr";
import { MenuDetailsState } from "../../state";
import { MenuOption } from "@/domain/shop_option";

interface _OptionTileProps {
  optionId: string;
  menuId: string;
  price: number;
  data: MenuDetailsState;
}

export default function MenuDetailsOptionTile({
  optionId,
  menuId,
  price,
  data,
}: _OptionTileProps) {
  const { mutate } = useSWR(
    `order-rooms/${data.orderRoom.orderRoomId}/menus/${data.menu.menuId}`
  );

  const menu = searchMenu(data.menus, menuId);
  const option = searchOption(data.options, optionId);
  const selectedMenuIds: string[] =
    (data.selectedOptionMenus as any)[optionId] ?? [];
  const isContained = selectedMenuIds.includes(menuId);

  const handleCheckBoxClicked = () => {
    const menuIds = _checkBoxClicked({
      isContained,
      menuId,
      selectedMenuIds,
      option,
    });

    const selectedOptionMenus = {
      ...data.selectedOptionMenus,
      [`${optionId}`]: menuIds,
    };

    mutate(
      {
        ...data,
        selectedOptionMenus,
      },
      false
    );
  };

  return (
    <button
      className="w-full items-start px-4 py-2.5"
      onClick={handleCheckBoxClicked}
    >
      <div className="flex">
        <input
          className="mr-3"
          type="radio"
          checked={isContained}
          onChange={handleCheckBoxClicked}
        />
        <p className="text-black font-bold text-sm grow">{menu.menuName}</p>
        <p className="ml-3">¥ {price}</p>
      </div>
    </button>
  );
}

interface _checkBoxClickedProps {
  isContained: boolean;
  menuId: string;
  selectedMenuIds: string[];
  option: MenuOption;
}

function _checkBoxClicked({
  isContained,
  menuId,
  selectedMenuIds,
  option,
}: _checkBoxClickedProps): string[] {
  if (isContained) {
    // 最大1つだけ選択できる場合
    if (option.maxSelectCount == 1) {
      return selectedMenuIds;
    }

    let menuIds: string[] = [];
    for (let selectedMenuId of selectedMenuIds) {
      if (selectedMenuId != menuId) {
        menuIds = [...menuIds, selectedMenuId];
      }
    }
    return menuIds;
  } else {
    if (option.maxSelectCount == 1) {
      // 最大1つだけ選択できる場合
      return [menuId];
    } else if (option.maxSelectCount <= selectedMenuIds.length) {
      // 最大選択個数よりも多い場合
      return selectedMenuIds;
    }
    return [...selectedMenuIds, menuId];
  }
}
