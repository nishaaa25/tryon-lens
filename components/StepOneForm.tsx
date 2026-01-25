export default function StepOneForm() {
    return (
        <div className="flex flex-col w-full h-full relative z-100 leading-[120%] gap-5">
            <div className="relative w-full flex justify-between items-center">
                <h3 className="text-xl font-semibold text-black-600">Product Photo</h3>
                <select className="w-fit bg-white border border-gray-200 rounded-md px-3 py-[10px] text-sm text-black-600 font-medium">
                    <option>Top & Bottom</option>
                    <option>Single Clothes</option>
                </select>
            </div>
            <div className="relative w-full grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-gray-200 bg-white">
                    <div className="flex justify-between items-center p-4 border-b border-gray-200">
                        <h4>Top</h4>
                        <button>Clear All Top Image</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
