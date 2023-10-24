import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCamera } from "@fortawesome/free-solid-svg-icons";

export default function EditProfilePage() {
  return (
    <main className="">
      <nav className="flex flex-col justify-center items-center my-6">
        <div className="relative mx-auto   flex justify-center">
          <Image
            src={"https://placehold.jp/150x150.png"}
            alt={"shop_icon_url"}
            width={140}
            height={140}
            className=" rounded-full z-0"
          ></Image>
          <div className="absolute right-0 bottom-0 ">
            <button className="z-1 w-12 h-12 bg-gray-100 text-lg text-white font-semibold rounded-full">
              <FontAwesomeIcon
                icon={faCamera}
                style={{ color: "gray" }}
                className="w-7 h-7 m-auto"
              />
            </button>
          </div>
        </div>

        <div className="w-80">
          <form action="" className=" text-center my-10">
            <input
              type="text"
              placeholder="名前"
              className="w-full  border-b-2 focus:outline-none  focus:border-gray-400"
            />
          </form>
          <div className="text-gray-400 mb-10 text-start">
            このオーダーグループで使用する名前とプロフィールアイコンを設定できます。aleのプロフィールは公開されません。aleのプロフィールとは別のプロフィールを設定すると身バレ防止に繋がります.
          </div>
        </div>

        <button className="text-black bg-gray-200 px-6 py-3 mx-auto rounded-lg self-center hover:bg-gray-300 ">
          自分のプロフィールを設定する
        </button>
        <div className="py-5"></div>
      </nav>
    </main>
  );
}
