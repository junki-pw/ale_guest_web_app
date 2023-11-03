import { MenuDetailsState } from "../state";
import { searchOption } from "@/services/methods/search";
import MenuDetailsOptionTile from "./sub/option_tile";

interface OptionTileProps {
  optionId: string;
  data: MenuDetailsState;
}

export default function MenuDetailsOptionTiles({
  optionId,
  data,
}: OptionTileProps) {
  const option = searchOption(data.options, optionId);

  return (
    <div>
      <div className="px-4 py-1.5">
        {option.isRequiredOption ? (
          <h2 className="text-xs py-0.5 px-2 bg-orange-500 text-white w-fit rounded-full">
            必須
          </h2>
        ) : (
          <div></div>
        )}
        <h1 className="my-1 text-sm font-bold">{option.optionName}</h1>
        <p className="text-xs text-gray-400">
          最大 {option.maxSelectCount} 個のオプションを選択して下さい
        </p>
      </div>

      {Object.keys(option.optionMenuIds).map((key, index) => {
        const menuId: string = option.optionMenuIds[index];
        const price: number = (option.menus as any)[menuId] ?? 0;
        return (
          <MenuDetailsOptionTile
            key={index}
            optionId={optionId}
            menuId={menuId}
            price={price}
            data={data}
          />
        );
      })}
    </div>
  );
}
