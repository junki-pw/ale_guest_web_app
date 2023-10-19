import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
  return (
    <main className="">
      <header className="bg-white p-10 border-b-2 border-gray-200">
        <nav className="flex justify-between ">
          <div className="font-bold">
            <a
              href=""
              className="text-red-500 hover:text-green-400 transition-all duration-300 md:text-3xl"
            >
              <FontAwesomeIcon
                icon={faXmark}
                style={{ color: "gray" }}
                className="w-5 h-5 m-auto"
              />
            </a>
          </div>
          <div className="mx-auto text-2xl font-bold text-gray-800">
            グループの参加確認
          </div>
        </nav>
      </header>

      <nav className="flex flex-col justify-center items-center ">
        <div className=" bg-gray-600 rounded-full h-40 w-40 mt-10 mb-6 flex justify-center "></div>

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
            <div className=" bg-gray-600 rounded-full h-20 w-20 flex justify-center"></div>
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
          <div
            className="mr-2 bg-gray-600  rounded
           h-40 w-40 flex justify-center flex-none"
          ></div>
          <div
            className="mr-2 bg-gray-600  rounded
           h-40 w-40 flex justify-center flex-none"
          ></div>{" "}
          <div
            className="mr-2 bg-gray-600  rounded
         h-40 w-40 flex justify-center flex-none"
          ></div>{" "}
          <div
            className="mr-2 bg-gray-600  rounded
       h-40 w-40 flex justify-center flex-none"
          ></div>{" "}
          <div
            className="mr-2 bg-gray-600  rounded
     h-40 w-40 flex justify-center flex-none"
          ></div>{" "}
          <div
            className="mr-2 bg-gray-600  rounded
   h-40 w-40 flex justify-center flex-none"
          ></div>
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
          「ルームなう」に共有
        </div>
        <div className="text-gray-400">
          どのお店でお食事をしているかをフォロワーに共有できます。
          <br />
          今どこにいるか分かる場合があるため注意してください。
        </div>
        <div className="py-5">
          <input
            type="checkbox"
            id=""
            name=""
            className=" focus:bg-green-600 hover:text-green-500 w-6 h-6"
          />
          <label htmlFor="" className="font-bold px-2 text-xl text-gray-6ﬁ00 ">
            「ルームなう」に共有を許可する
          </label>
        </div>
        <div className="pb-2 pt-8  font-bold text-gray-600 text-xl">
          参加メンバー5人
        </div>
        <div className="flex">
          <div className=" bg-gray-600 rounded-full h-20 w-20 flex justify-center"></div>
          <div className="font-bold my-auto mx-4 text-gray-800">
            ユーザー名ユーザー名ユーザー名ユーザー名
          </div>
        </div>
        <div className="flex mt-4">
          <div className=" bg-gray-600 rounded-full h-20 w-20 flex justify-center"></div>
          <div className="font-bold my-auto mx-4 text-gray-800">
            ユーザー名ユーザー名ユーザー名ユーザー名
          </div>
        </div>
        <div className="flex mt-4">
          <div className=" bg-gray-600 rounded-full h-20 w-20 flex justify-center"></div>
          <div className="font-bold my-auto mx-4 text-gray-800">
            ユーザー名ユーザー名ユーザー名ユーザー名
          </div>
        </div>
        <div className="flex mt-4">
          <div className=" bg-gray-600 rounded-full h-20 w-20 flex justify-center"></div>
          <div className="font-bold my-auto mx-4 text-gray-800">
            ユーザー名ユーザー名ユーザー名ユーザー名
          </div>
        </div>
        <div className="flex mt-4">
          <div className=" bg-gray-600 rounded-full h-20 w-20 flex justify-center"></div>
          <div className="font-bold my-auto mx-4 text-gray-800">
            ユーザー名ユーザー名ユーザー名ユーザー名
          </div>
        </div>
      </div>
      <footer className="mt-14 mb-10 flex justify-between">
        <button className="text-white bg-gray-800 px-8 py-5 font-bold mx-auto rounded-lg self-center hover:bg-gray-700 ">
          参加しない
        </button>
        <button className="text-white bg-orange-500 px-12 py-5 font-bold mx-auto rounded-lg self-center hover:bg-orange-400 ">
          新しいプロフィールで参加
        </button>
      </footer>
    </main>
  );
}
