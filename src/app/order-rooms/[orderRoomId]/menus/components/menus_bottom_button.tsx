
const MenusBottomButton = () => {
    return (
        <div className="fixed bottom-3 px-4 w-full">
            <button className="flex py-3 px-4 bg-orange-500 rounded-lg w-full text-white font-bold items-center">
                <h1 className="bg-white text-orange-500 h-6 w-6 rounded-full">8</h1>
                <h1 className="grow mx-3 text-left">カートを見る</h1>
                <div className="flex items-center">
                    <h1 className="text-xs mr-1">¥</h1>
                    <h5 className="">980</h5>
                </div>
            </button>
        </div>
    );
}

export default MenusBottomButton;