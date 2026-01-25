import Image from "next/image";
import { useState } from "react";

const mockModels = [
  {
    id: 1,
    name: "Studio Background 1",
    featured: true,
  },
  {
    id: 2,
    name: "Studio Background 2",
    featured: false,
  },
  {
    id: 3,
    name: "Indoor Background 1",
    featured: false,
  },
  {
    id: 4,
    name: "Outdoor Background 1",
    featured: false,
  },
  {
    id: 5,
    name: "Studio Background 3",
    featured: true,
  },
  {
    id: 6,
    name: "Indoor Background 2",
    featured: false,
  },
];

export default function BackgroundGallery() {
    const [activeTab, setActiveTab] = useState("Studio");

  return (
    <div className="flex flex-col h-full relative overflow-hidden gap-[14px]">
      <div className="relative flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl leading-[120%] font-semibold text-black-600 mb-1">
            Background Gallery
          </h2>
          <p className="text-sm leading-[140%] font-medium text-gray-600 ">
            Select a background
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="relative flex justify-between items-center ">
        <div className="inline-flex rounded-lg bg-[#f2f5f8] p-1 text-sm leading-[120%] border border-gray-200 font-medium">
          <button onClick={() => setActiveTab("Studio")} className={`w-[133px] py-1.5 rounded-md ${activeTab === "Studio" ? " text-black-600 bg-white" : "bg-transparent  text-gray-600"} `}>
            Studio
            <span className="text-orange-600 font-semibold rounded-full leading-[140%] text-sm  ml-1 px-1 bg-[#fff3eb]">
              68
            </span>
          </button>
          <button onClick={() => setActiveTab("Indoor")} className={`w-[133px] py-1.5 rounded-md ${activeTab === "Indoor" ? " text-black-600 bg-white" : "bg-transparent  text-gray-600"} `}>
            Indoor
            <span className="text-orange-600 font-semibold rounded-full leading-[140%] text-sm  ml-1 px-1 bg-[#fff3eb]">
              15
            </span>
          </button>
          <button onClick={() => setActiveTab("Outdoor")} className={`w-[133px] py-1.5 rounded-md  ${activeTab === "Outdoor" ? " text-black-600 bg-white" : "bg-transparent  text-gray-600"} `}>
            Outdoor
            <span className="text-orange-600 font-semibold rounded-full leading-[140%] text-sm  ml-1 px-1 bg-[#fff3eb]">
              15
            </span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-md border border-gray-200 font-medium bg-white px-3 py-[10px] text-sm leading-[120%] text-black-600  hover:bg-gray-50">
            <Image
              src="/assets/like.svg"
              alt="heart icon"
              width={16}
              height={16}
            />
            <span>Favorites</span>
          </button>
        </div>
      </div>

      <div className="relative overflow-y-auto mt-2 no-scrollbar pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {mockModels.map((model) => (
            <div
              key={model.id}
              className={`rounded-xl border overflow-hidden flex flex-col transition-all ${
                model.featured
                  ? "border-orange-300 bg-[#fff3eb]"
                  : "border-gray-200 bg-white hover:shadow-md"
              }`}
            >
              <div
                className={`px-4 py-3.5 flex items-center justify-between border-b ${model.featured ? "border-orange-300" : "border-gray-200"} `}
              >
                <p className="text-sm font-medium text-black-600 leading-[120%]">
                  {model.name}
                </p>
                <Image
                  src="/assets/like.svg"
                  width={16}
                  height={16}
                  alt="like icon"
                />
              </div>
              <div className="relative p-4 flex justify-center items-center">
                <div
                  className={`rounded-xl w-full p-1.5 relative h-[18rem] overflow-hidden border ${model.featured ? "border-orange-600" : "border-gray-200"} bg-white`}
                >
                  <Image
                    src="/assets/studio.png"
                    alt={model.name}
                    fill
                    className="w-full h-full absolute top-0 left-0 object-cover"
                  />
                  {/* Top chips */}
                  <div className="flex justify-between items-start relative">
                    <button
                      type="button"
                      className="relative inline-flex items-center gap-1 rounded-full bg-white border border-gray-200 px-2 py-1 text-[13px] leading-[120%] text-gray-600"
                    >
                      <Image
                        src="/assets/preview-eye.svg"
                        alt="preview eye"
                        width={16}
                        height={16}
                      />
                      <span>Preview</span>
                    </button>
                    {model.featured && (
                      <Image
                        src="/assets/selected.svg"
                        alt="featured badge"
                        width={16}
                        height={16}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
