import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { MouseEventHandler } from "react";

interface PrimaryQuantityButtonProps {
  addClicked: MouseEventHandler | undefined;
  minusClicked: MouseEventHandler | undefined;
  amount: number;
}

export default function PrimaryQuantityButton({
  addClicked,
  minusClicked,
  amount,
}: PrimaryQuantityButtonProps) {
  return (
    <div className="flex px-2 py-2 bg-orange-400 rounded-md items-center">
      <_Button isMinus={true} onClick={minusClicked} />
      <div className="w-6 mx-4 text-base text-white text-center">{amount}</div>
      <_Button isMinus={false} onClick={addClicked} />
    </div>
  );
}

interface _ButtonProps {
  isMinus: boolean;
  onClick: MouseEventHandler | undefined;
}

const _Button = ({ isMinus, onClick }: _ButtonProps) => {
  return (
    <button
      className={`flex h-5 w-5 rounded-full items-center justify-center content-center bg-white text-orange-500`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={isMinus ? faMinus : faPlus} className="h-[16px]" />
    </button>
  );
};
