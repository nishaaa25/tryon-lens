import Image from "next/image";
import { useState } from "react";

export default function StepOneForm() {
    const [selectedOption, setSelectedOption] = useState("Top & Bottom");

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedOption(event.target.value);
    }
    
  return (
    <div className="flex flex-col w-full h-full relative z-100 leading-[120%] gap-5">
      <div className="relative w-full flex justify-between items-center">
        <h3 className="text-xl font-semibold text-black-600">Product Photo</h3>
        <select className="w-fit bg-white border border-gray-200 rounded-md px-3 py-[10px] text-sm text-black-600 font-medium" onChange={handleSelectChange} value={selectedOption}>
          <option>Top & Bottom</option>
          <option>Single Clothes</option>
        </select>
      </div>
      <div className={`relative w-full grid grid-cols-2 gap-4 ${selectedOption === "Top & Bottom" ? "grid" : "hidden"}`}>
        <div className="rounded-xl relative overflow-hidden border border-gray-200 bg-white">
          <div className="flex justify-between items-center relative p-4 border-b border-gray-200">
            <h4 className="text-base leading-[120%] text-black-600 font-semibold">
              Top
            </h4>
            <button className="text-sm text-gray-600 font-medium leading-[140%] flex gap-1">
              <Image src="/assets/bin.svg" alt="bin" width={16} height={16} />
              Clear All Top Image
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4 relative">
            <div className="w-full relative flex flex-col gap-3">
              <div className="flex justify-between items-center relative">
                <h4 className="text-sm font-medium text-gray-600">Front</h4>
                <Image
                  src="/assets/dots.svg"
                  alt="placeholder"
                  width={18}
                  height={18}
                  className="relative"
                />
              </div>
              <div className="w-full relative h-[16rem] rounded-xl overflow-hidden">
                <Image
                  src="/assets/dummy-upload.png"
                  alt="placeholder"
                  fill
                  className="relative object-cover"
                />
              </div>
            </div>
            <div className="w-full relative flex flex-col gap-3">
              <div className="flex justify-between items-center relative">
                <h4 className="text-sm font-medium text-gray-600">Back</h4>
              </div>
              <div className="w-full relative h-[16rem] border border-dashed justify-center items-center border-[#cacfd8]  p-3 flex flex-col gap-3.5 rounded-xl overflow-hidden">
                <div className="w-full h-2/3 relative flex justify-center items-center">
                  <Image
                    src="/assets/front-upload.png"
                    alt="placeholder"
                    fill
                    className="relative object-contain scale-95 "
                  />
                </div>
                <div className="flex flex-col gap-1.5 relative items-center justify-center text-center">
                  <p className="text-base font-semibold leading-[120%] text-black-600">
                    Upload Top Back View
                  </p>
                  <p className="text-xs leading-[140%]  font-medium w-9/12 text-gray-600">
                    Drop or click to add image (PNG, JPG, WebP, AVIF, HEIC)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-xl relative overflow-hidden border border-gray-200 bg-white">
          <div className="flex justify-between items-center relative p-4 border-b border-gray-200">
            <h4 className="text-base leading-[120%] text-black-600 font-semibold">
              Back
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4 relative">
            <div className="w-full relative flex flex-col gap-3">
              <div className="flex justify-between items-center relative">
                <h4 className="text-sm font-medium text-gray-600">Front</h4>
              </div>
              <div className="w-full relative h-[16rem] justify-center items-center border border-dashed border-[#cacfd8]  p-3 flex flex-col gap-3.5 rounded-xl overflow-hidden">
                <div className="w-full h-2/3 relative flex justify-center items-center">
                  <Image
                    src="/assets/bottom-front.png"
                    alt="placeholder"
                    fill
                    className="relative object-contain scale-95 "
                  />
                </div>
                <div className="flex flex-col gap-1.5 relative items-center justify-center text-center">
                  <p className="text-base font-semibold leading-[120%] text-black-600">
                    Upload Bottom Front View
                  </p>
                  <p className="text-xs leading-[140%] font-medium w-9/12 text-gray-600">
                    Drop or click to add image (PNG, JPG, WebP, AVIF, HEIC)
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full relative flex flex-col gap-3">
              <div className="flex justify-between items-center relative">
                <h4 className="text-sm font-medium text-gray-600">Back</h4>
              </div>
              <div className="w-full relative h-[16rem] justify-center items-center border border-dashed border-[#cacfd8]  p-3 flex flex-col gap-3.5 rounded-xl overflow-hidden">
                <div className="w-full h-2/3 relative flex justify-center items-center">
                  <Image
                    src="/assets/bottom-back.png"
                    alt="placeholder"
                    fill
                    className="relative object-contain scale-95 "
                  />
                </div>
                <div className="flex flex-col gap-1.5 relative items-center justify-center text-center">
                  <p className="text-base font-semibold leading-[120%] text-black-600">
                    Upload Bottom Back View
                  </p>
                  <p className="text-xs leading-[140%] font-medium w-9/12 text-gray-600">
                    Drop or click to add image (PNG, JPG, WebP, AVIF, HEIC)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       <div className={`relative w-full gap-4 ${selectedOption === "Single Clothes" ? "flex" : "hidden"}`}>
        <div className="rounded-xl w-full relative overflow-hidden border border-gray-200 bg-white">
          <div className="flex justify-between items-center relative p-4 border-b border-gray-200">
            <h4 className="text-base leading-[120%] text-black-600 font-semibold">
              Single Clothes
            </h4>
            <button className="text-sm text-gray-600 font-medium leading-[140%] flex gap-1">
              <Image src="/assets/bin.svg" alt="bin" width={16} height={16} />
              Clear All 
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4 relative">
            <div className="w-full relative flex flex-col gap-3">
              <div className="flex justify-between items-center relative">
                <h4 className="text-sm font-medium text-gray-600">Front</h4>
                <Image
                  src="/assets/dots.svg"
                  alt="placeholder"
                  width={18}
                  height={18}
                  className="relative"
                />
              </div>
              <div className="w-full relative h-[20rem] rounded-xl overflow-hidden">
                <Image
                  src="/assets/dummy-upload.png"
                  alt="placeholder"
                  fill
                  className="relative object-cover"
                />
              </div>
            </div>
            <div className="w-full relative flex flex-col gap-3">
              <div className="flex justify-between items-center relative">
                <h4 className="text-sm font-medium text-gray-600">Back</h4>
              </div>
              <div className="w-full relative h-[20rem] border border-dashed border-[#cacfd8]  p-3 flex flex-col justify-center items-center gap-3.5 rounded-xl overflow-hidden">
                <div className="w-full h-2/3 relative flex justify-center items-center">
                  <Image
                    src="/assets/single-back.png"
                    alt="placeholder"
                    fill
                    className="relative object-contain scale-95 "
                  />
                </div>
                <div className="flex flex-col gap-1.5 relative items-center justify-center text-center">
                  <p className="text-base font-semibold leading-[120%] text-black-600">
                    Upload Top Back View
                  </p>
                  <p className="text-xs leading-[140%] font-medium w-7/12 text-gray-600">
                    Drop or click to add image (PNG, JPG, WebP, AVIF, HEIC)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
