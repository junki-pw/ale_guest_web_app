import {
  IconDefinition,
  faBookOpen,
  faCashRegister,
  faClockRotateLeft,
  faGift,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React from "react";
import { OrderRoomState } from "../state";

interface OrderRoomBottomProps {
  data: OrderRoomState;
}

export default function OrderRoomBottom({ data }: OrderRoomBottomProps) {
  return (
    <div className="fixed bottom-0 w-full bg-white py-3 flex px-4 border-t-2 border-gray-100">
      <_IconTile iconTileType={"menu"} data={data} />
      <div className="w-2"></div>
      <_IconTile iconTileType={"history"} data={data} />
      <div className="w-2"></div>
      <_IconTile iconTileType={"tips"} data={data} />
      <div className="w-2"></div>
      <_IconTile iconTileType={"checkout"} data={data} />
    </div>
  );
}

interface _IconTileProps {
  iconTileType: string;
  data: OrderRoomState;
}

const _IconTile = ({ iconTileType, data }: _IconTileProps) => {
  let icon: IconDefinition;
  let label: string;
  const router = useRouter();

  switch (iconTileType) {
    case "menu":
      icon = faBookOpen;
      label = "メニュー表";
      break;
    case "history":
      icon = faClockRotateLeft;
      label = "注文履歴";
      break;
    case "tips":
      icon = faGift;
      label = "チップ";
      break;
    default:
      icon = faCashRegister;
      label = "お会計";
  }

  const baseUrl: string = `/order-rooms/${data.orderRoom.orderRoomId}`;

  function handleClicked() {
    switch (iconTileType) {
      case "menu":
        router.push(`${baseUrl}/menus`);
        break;
      case "history":
        router.push(`${baseUrl}/order-histories`);
        break;
      case "tips":
        break;
      default:
        router.push(`${baseUrl}/checkout`);
    }
  }

  return (
    <button
      className="grow bg-gray-50 py-1 rounded-md flex-col items-center"
      onClick={handleClicked}
    >
      <FontAwesomeIcon
        icon={icon}
        className="mt-2 mb-1 w-full h-6  text-center text-gray-700"
      />
      <h2 className="text-[10px] text-gray-400 text-center">{label}</h2>
    </button>
  );
};
