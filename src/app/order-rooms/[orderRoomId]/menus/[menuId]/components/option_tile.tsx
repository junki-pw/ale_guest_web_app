export default function OptionTile() {
    return (
        <div>
            <div className="px-4 py-1.5">
                <h2 className="text-xs py-0.5 px-2 bg-orange-500 text-white w-fit rounded-full">必須</h2>
                <h1 className="my-1 text-sm font-bold">タイトル</h1>
                <p className="text-xs text-gray-400">テキスト</p>
            </div>
            <_OptionTile />
            <_OptionTile />
            <_OptionTile />
        </div>
    )
}

function _OptionTile() {
    return (
        <button
            className='w-full items-start px-4 py-2.5'
            onClick={() => { }}
        >
            <div className='flex'>
                <input
                    className='mr-3'
                    type="radio"
                    checked={true}
                    onChange={() => { }}
                />
                <p className="text-black font-bold text-sm">オプションテキスト</p>
            </div>
        </button>
    );
}