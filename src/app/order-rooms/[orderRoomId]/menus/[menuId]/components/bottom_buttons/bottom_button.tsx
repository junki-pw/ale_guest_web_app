import React, { MouseEventHandler } from "react";

interface MenuDetailsPrimaryBottomButtonProps {
  buttonText: string;
  onClick: MouseEventHandler | undefined;
}

export default function MenuDetailsPrimaryBottomButton({
  onClick,
  buttonText,
}: MenuDetailsPrimaryBottomButtonProps) {
  return (
    <div className="absolute w-full bottom-0 px-4 py-3">
      <button
        className={`
          w-full  text-center py-3 rounded-md font-bold
          ${
            onClick === undefined
              ? "bg-gray-50 text-gray-500"
              : "bg-orange-500 text-white"
          }
        `}
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
}
