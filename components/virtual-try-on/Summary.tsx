import Image from "next/image";

export default function Summary() {
  return (
    <div className="flex flex-col h-full relative overflow-hidden gap-3.5">
      <h2 className="text-xl leading-[120%] font-semibold text-black-600 mb-1">
        Summary
      </h2>
      <div className="flex justify-center items-center gap-5 relative h-full overflow-hidden no-scrollbar">
        <div className="flex flex-col border-b gap-4 border w-[73%] border-gray-200 rounded-2xl bg-white h-full ">
          <h3 className="text-base leading-[120%] p-4  border-b border-gray-200 font-semibold text-black-600 mb-1">
            Product Images
          </h3>
          <div className="flex gap-4 px-4 h-full">
            <div className="relative flex flex-col w-1/2 gap-2">
              <h4 className="text-sm leading-[140%] font-medium text-gray-600">
                Front
              </h4>
              <div className="rounded-xl relative overflow-hidden w-full h-[22rem] product-bg border border-gray-200">
                <Image
                  src="/assets/product.png"
                  alt="Product Front"
                  fill
                  className="object-contain scale-[0.9]"
                />
              </div>
            </div>
            <div className="relative flex flex-col w-1/2 gap-2">
              <h4 className="text-sm leading-[140%] font-medium text-gray-600">
                Back
              </h4>
              <div className="rounded-xl relative overflow-hidden w-full h-[22rem] product-bg border border-gray-200">
                <Image
                  src="/assets/product.png"
                  alt="Product Back"
                  fill
                  className="object-contain scale-[0.9]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-6 border w-[27%] border-gray-200 rounded-2xl bg-white h-full "></div>
      </div>
    </div>
  );
}
