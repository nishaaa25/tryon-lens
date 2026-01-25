"use client";

import Image from "next/image";
import React from "react";

type CustomModel = {
  id: number;
  imageUrl: string;
};

const selectedModels: CustomModel[] = [
  {
    id: 1,
    imageUrl: "/assets/poses.png",
  },
  {
    id: 2,
    imageUrl: "/assets/poses.png",
  },
  {
    id: 3,
    imageUrl: "/assets/poses.png",
  },
  {
    id: 4,
    imageUrl: "/assets/poses.png",
  },
  {
    id: 5,
    imageUrl: "/assets/poses.png",
  },
  {
    id: 6,
    imageUrl: "/assets/poses.png",
  },
];

export default function PosesGallery() {
  const [selectedPoses, setSelectedPoses] = React.useState<number[]>([]);

  const togglePoseSelection = (poseId: number) => {
    setSelectedPoses((prevSelected) => {
      if (prevSelected.includes(poseId)) {
        return prevSelected.filter((id) => id !== poseId);
      } else {
        if (prevSelected.length < 4) {
          return [...prevSelected, poseId];
        } else {
          return prevSelected;
        }
      }
    });
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden gap-5">
      {/* Header text */}
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl leading-[120%] font-semibold text-black-600 mb-1">
            Poses Gallery
          </h2>
          <p className="text-sm leading-[140%] font-medium text-gray-600 mb-[14px]">
            Select upto 4 poses
          </p>
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
        <div className="flex items-center gap-2">
          <div className="h-19 w-12 rounded-md border bg-[#f2f5f8] relative border-gray-200 overflow-hidden"></div>
          <div className="h-19 w-12 rounded-md border bg-[#f2f5f8] relative border-gray-200 overflow-hidden"></div>
          <div className="h-19 w-12 rounded-md border bg-[#f2f5f8] relative border-gray-200 overflow-hidden">
            <Image
              src="/assets/dummy-upload.png"
              alt="Model thumbnail"
              fill
              className=" object-cover"
            />
          </div>
          <div className="h-19 w-12 rounded-md border bg-[#f2f5f8] relative border-gray-200 overflow-hidden">
            <Image
              src="/assets/dummy-upload.png"
              alt="Model thumbnail"
              fill
              className=" object-cover"
            />
          </div>
        </div>
      </div>

      {/* Gradient body */}
      <div className="flex-1 pb-4 relative h-full w-full overflow-auto">
        <p className="text-base leading-[120%] font-semibold text-black-600 mb-4">
          Full body poses (10)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-y-auto relative no-scrollbar">
          {selectedModels.map((model) => (
            <button
              key={model.id}
              onClick={() => togglePoseSelection(model.id)}
              className={` ${selectedPoses.includes(model.id) ? "border-orange-300 bg-[#fff3eb]" : "border-gray-200 bg-white"} border p-4 rounded-xl gap-4 overflow-hidden`}
            >
              <div
                className={`rounded-xl p-1.5 relative h-[20rem] overflow-hidden ${selectedPoses.includes(model.id) ? "border border-orange-600" : "border border-gray-200"}`}
              >
                <Image
                  src="/assets/poses.png"
                  alt={`Model ${model.id}`}
                  className="w-full absolute top-0 left-0 object-cover"
                  fill
                />
                <div className="relative flex justify-between items-start">
                  <div className="relative bg-white p-1.5 rounded-full flex justify-center items-center border border-gray-200 w-7 h-7">
                    <Image
                      src="/assets/like.svg"
                      alt="like icon"
                      width={16}
                      height={16}
                    />
                  </div>
                   {
                        selectedPoses.includes(model.id) && (
                          <Image src="/assets/selected.svg" alt="selected icon" width={16} height={16} className="relative" />
                        )
                    }
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
