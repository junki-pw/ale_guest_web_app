import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
  return (
    <main className="">
      <nav className="flex flex-col justify-center items-center ">
        <Image
          src={"https://placehold.jp/150x150.png"}
          alt={"shop_icon_url"}
          width={72}
          height={72}
          className="my-6 rounded-full"
        ></Image>
        <div className="font-bold text-2xl text-gray-800 mb-2">
          ガンジャバンギラス
        </div>
        <div className="text-gray-600 mb-10 text-center font-bold">
          メンバー 3・オーダー済み 12
        </div>
      </nav>
      <div className="text-start px-6">
        <div className="py-4 font-bold text-gray-600 text-xl">お店について</div>
        <div className="flex justify-between">
          <div className="flex ">
            <Image
              src={"https://placehold.jp/150x150.png"}
              alt={"shop_icon_url"}
              width={32}
              height={32}
              className="my-6 rounded-full"
            ></Image>
            <div className="px-4 py-4">
              <div className=" font-bold text-gray-800">
                店舗名店舗名店舗名店舗名店舗名
              </div>
              <div className="text-gray-400">東京都・新宿区</div>
            </div>
          </div>
          <button>
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ color: "gray" }}
              className="w-5 h-5 m-auto"
            />
          </button>
        </div>
        <div className="pb-2 pt-8 font-bold text-gray-600 text-xl">
          お席について
        </div>
        <div className="text-gray-600">
          お席の説明お席の説明お席の説明お席の説明お席の説明お席の説明お席の説明お席の説明お席の説明お席の説明お席の説明お席の説明お席の説明お席の説明お席の説明お席の説明
        </div>
        <div className="py-4 flex overflow-x-auto">
          <Image
            src={"https://placehold.jp/150x150.png"}
            alt={"shop_icon_url"}
            width={64}
            height={64}
            className="my-6 rounded-lg mx-1"
          ></Image>
          <Image
            src={"https://placehold.jp/150x150.png"}
            alt={"shop_icon_url"}
            width={64}
            height={64}
            className="my-6 rounded-lg mx-1"
          ></Image>
          <Image
            src={"https://placehold.jp/150x150.png"}
            alt={"shop_icon_url"}
            width={64}
            height={64}
            className="my-6 rounded-lg mx-1"
          ></Image>
          <Image
            src={"https://placehold.jp/150x150.png"}
            alt={"shop_icon_url"}
            width={64}
            height={64}
            className="my-6 rounded-lg mx-1"
          ></Image>
          <Image
            src={"https://placehold.jp/150x150.png"}
            alt={"shop_icon_url"}
            width={64}
            height={64}
            className="my-6 rounded-lg mx-1"
          ></Image>
          <Image
            src={"https://placehold.jp/150x150.png"}
            alt={"shop_icon_url"}
            width={64}
            height={64}
            className="my-6 rounded-lg mx-1"
          ></Image>
          <Image
            src={"https://placehold.jp/150x150.png"}
            alt={"shop_icon_url"}
            width={64}
            height={64}
            className="my-6 rounded-lg mx-1"
          ></Image>
          <Image
            src={"https://placehold.jp/150x150.png"}
            alt={"shop_icon_url"}
            width={64}
            height={64}
            className="my-6 rounded-lg mx-1"
          ></Image>
        </div>
        <div className="pb-2 pt-8  font-bold text-gray-600 text-xl">
          突き出し・テーブルチャージ
        </div>
        <div className="flex justify-between ">
          <div className="text-gray-600">突き出し名目</div>
          <div>￥0</div>
        </div>
        <div className="flex justify-between ">
          <div className="text-gray-600">テーブルチャージ名目</div>
          <div>￥5000/席</div>
        </div>
        <div className="pb-2 pt-8  font-bold text-gray-600 text-xl">
          参加メンバー5人
        </div>
        <div className="flex">
          <Image
            src={"https://placehold.jp/150x150.png"}
            alt={"shop_icon_url"}
            width={36}
            height={36}
            className="my-6 rounded-full"
          ></Image>
          <div className="font-bold my-auto mx-4 text-gray-800">
            ユーザー名ユーザー名ユーザー名ユーザー名
          </div>
        </div>
        <div className="flex mt-2">
          <Image
            src={"https://placehold.jp/150x150.png"}
            alt={"shop_icon_url"}
            width={36}
            height={36}
            className="my-6 rounded-full"
          ></Image>
          <div className="font-bold my-auto mx-4 text-gray-800">
            ユーザー名ユーザー名ユーザー名ユーザー名
          </div>
        </div>
        <div className="flex mt-1">
          <Image
            src={"https://placehold.jp/150x150.png"}
            alt={"shop_icon_url"}
            width={36}
            height={36}
            className="my-6 rounded-full"
          ></Image>
          <div className="font-bold my-auto mx-4 text-gray-800">
            ユーザー名ユーザー名ユーザー名ユーザー名
          </div>
        </div>
        <div className="flex mt-1">
          <Image
            src={"https://placehold.jp/150x150.png"}
            alt={"shop_icon_url"}
            width={36}
            height={36}
            className="my-6 rounded-full"
          ></Image>
          <div className="font-bold my-auto mx-4 text-gray-800">
            ユーザー名ユーザー名ユーザー名ユーザー名
          </div>
        </div>
        <div className="flex mt-1">
          <Image
            src={"https://placehold.jp/150x150.png"}
            alt={"shop_icon_url"}
            width={36}
            height={36}
            className="my-6 rounded-full"
          ></Image>
          <div className="font-bold my-auto mx-4 text-gray-800">
            ユーザー名ユーザー名ユーザー名ユーザー名
          </div>
        </div>
      </div>
      <footer className="mt-14 mb-10 flex ">
        <button className="text-white bg-gray-800 px-8 py-5 font-bold  rounded-lg self-center hover:bg-gray-700 mx-6">
          参加しない
        </button>
        <button className="text-white bg-orange-500 px-16 py-5 font-bold  rounded-lg self-center hover:bg-orange-400 mx-6">
          新しいプロフィールで参加
        </button>
      </footer>
    </main>
  );
}
