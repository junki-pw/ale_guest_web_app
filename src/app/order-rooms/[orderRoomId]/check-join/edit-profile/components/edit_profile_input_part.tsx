import React from "react";
import { CheckJoinEditProfileState } from "../state";
import { KeyedMutator } from "swr";

interface EditProfileInputPartProps {
  mutate: KeyedMutator<CheckJoinEditProfileState>;
  data: CheckJoinEditProfileState;
}

export default function EditProfileInputPart({
  mutate,
  data,
}: EditProfileInputPartProps) {
  function handleOnChanged(e: React.ChangeEvent<HTMLInputElement>) {
    mutate({ ...data, inputValue: e.target.value }, false);
  }

  return (
    <div className="px-12">
      <input
        type="text"
        placeholder="パンダ"
        className="border-b-2 border-gray-100 w-full px-1.5 py-2"
        onChange={(e) => handleOnChanged(e)}
      />
      <p className="mt-4 text-xs text-gray-400">
        このオーダーグループで使用する名前とプロフィールアイコンを設定できます。aleのプロフィールは公開されません。aleのプロフィールとは別のプロフィールを設定すると身バレ防止に繋がります.
      </p>
    </div>
  );
}
