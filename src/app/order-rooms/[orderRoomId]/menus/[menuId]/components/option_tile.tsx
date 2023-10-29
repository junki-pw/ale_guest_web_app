import { MenuOption } from "@/domain/shop_option";
import { MenuDetailsState } from "../state";
import { searchMenu, searchOption } from "@/services/methods/search";
import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";
import { menuDetailsDetailsFetcher } from "../fetcher";

interface OptionTileProps {
  optionId: string;
  data: MenuDetailsState;
}

export default function OptionTile({ optionId, data }: OptionTileProps) {
  const selectedOption = searchOption(data.options, optionId);

  return (
    <div>
      <div className="px-4 py-1.5">
        {selectedOption.isRequiredOption ? (
          <h2 className="text-xs py-0.5 px-2 bg-orange-500 text-white w-fit rounded-full">
            必須
          </h2>
        ) : (
          <div></div>
        )}
        <h1 className="my-1 text-sm font-bold">{selectedOption.optionName}</h1>
        <p className="text-xs text-gray-400">{}</p>
      </div>
      {(selectedOption.menus as any).map((e: any) => (
        <_OptionTile
          key={uuidv4()}
          optionId={optionId}
          menuId={e.key}
          price={e.value}
          data={data}
        />
      ))}
    </div>
  );
}

interface _OptionTileProps {
  optionId: string;
  menuId: string;
  price: number;
  data: MenuDetailsState;
}

function _OptionTile({ optionId, menuId, price, data }: _OptionTileProps) {
  const menu = searchMenu(data.menus, menuId);
  const selectedOptionIds: string[] =
    (data.selectedOptionMenus as any)[optionId] ?? [];

  const isContained = selectedOptionIds.includes(menuId);

  const { mutate } = useSWR(
    `order-rooms/${data.orderRoom.orderRoomId}/menus/${data.menu.menuId}`,
    () =>
      menuDetailsDetailsFetcher({
        orderRoomId: data.orderRoom.orderRoomId,
        menuId: data.menu.menuId,
        orderCartId: null,
      })
  );

  const handleCheckBoxClicked = () => {
    let optionIds: any[] = [];
    if (isContained) {
      optionIds = [...optionIds, optionId];
    } else {
      for (let selectedOptionId of selectedOptionIds) {
        if (selectedOptionId != optionId) {
          optionIds = [...optionIds, selectedOptionId];
        }
      }
    }

    mutate(
      {
        ...data,
        selectedOptionMenus: {
          ...data.selectedOptionMenus,
          optionId: optionIds,
        },
      },
      false
    );
  };

  return selectedOptionIds.map((selectedOptionId) => (
    <button
      key={selectedOptionId}
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
  ));
}
