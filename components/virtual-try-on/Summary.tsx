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
        <div className="flex flex-col  border w-[27%] border-gray-200 rounded-2xl overflow-hidden bg-white h-full ">
          <h3 className="text-base leading-[120%] p-4  border-b border-gray-200 font-semibold text-black-600 mb-1">
            Untitled Project
            <Image
              src="/assets/edit.svg"
              alt="edit"
              width={16}
              height={16}
              className="inline-block ml-1"
            />
          </h3>
          <div className="p-4 relative flex flex-col gap-4 overflow-y-auto no-scrollbar">
            <div className="flex flex-col gap-2 border-b pb-4 border-gray-200">
              <h3 className="text-sm leading-[120%] font-medium text-black-600 mb-1">
                Models
                <Image
                  src="/assets/edit.svg"
                  alt="edit"
                  width={16}
                  height={16}
                  className="inline-block ml-1"
                />
              </h3>
              <div className="flex gap-3 relative">
                <div className="flex flex-col gap-2 w-full relative">
                  <div className="rounded-md relative overflow-hidden w-full h-[9rem]  border border-gray-200">
                    <Image
                      src="/assets/model.png"
                      alt="Product Model"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <h4 className="text-sm leading-[120%] font-semibold text-black-600">
                      Denise
                    </h4>
                    <p className="text-sm leading-[140%] text-gray-600 font-medium">
                      Size: Medium (M)
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full relative">
                  <div className="rounded-md relative overflow-hidden w-full h-[9rem]  border border-gray-200">
                    <Image
                      src="/assets/model.png"
                      alt="Product Model"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <h4 className="text-sm leading-[120%] font-semibold text-black-600">
                      Denise
                    </h4>
                    <p className="text-sm leading-[140%] text-gray-600 font-medium">
                      Size: Small (M)
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 pb-4 border-b border-gray-200">
              <h3 className="text-sm leading-[120%] font-medium text-black-600 mb-1">
                Poses
                <Image
                  src="/assets/edit.svg"
                  alt="edit"
                  width={16}
                  height={16}
                  className="inline-block ml-1"
                />
              </h3>
              <div className="grid grid-cols-4 gap-3 relative">
                <div className="flex flex-col gap-2 w-full relative">
                  <div className="rounded-md relative overflow-hidden w-full h-[9rem]  border border-gray-200">
                    <Image
                      src="/assets/model.png"
                      alt="Product Model"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full relative">
                  <div className="rounded-md relative overflow-hidden w-full h-[9rem]  border border-gray-200">
                    <Image
                      src="/assets/model.png"
                      alt="Product Model"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm leading-[120%] font-medium text-black-600 mb-1">
                Background
                <Image
                  src="/assets/edit.svg"
                  alt="edit"
                  width={16}
                  height={16}
                  className="inline-block ml-1"
                />
              </h3>
              <div className="flex gap-3 relative">
                <div className="flex flex-col gap-2 w-full relative">
                  <div className="rounded-md relative overflow-hidden w-full h-[15rem]  border border-gray-200">
                    <Image
                      src="/assets/studio.png"
                      alt="Product Model"
                      fill
                      className="object-cover"
                    />
                    <p className="px-2 py-1 absolute bottom-1 left-1 rounded-full text-gray-600 bg-white border border-gray-200 text-xs leading-[120%]">Soft pearl studio</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 relative border-t border-gray-200 bg-[#f7f5fa]">
            <div className="text-sm flex justify-between items-center leading-[140%] text-gray-600 font-medium mb-2">
              <p>2 models x 2 poses</p>
              <p>4 photos</p>
            </div>
            <div className="flex justify-between items-center text-base leading-[120%] font-semibold text-black-600">
              <h4>Total</h4>
              <p>$199.99</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
