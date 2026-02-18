"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export type BackgroundItem = {
  id: number;
  name: string;
  category: "Studio" | "Indoor" | "Outdoor";
  imageUrl: string;
};

export const backgrounds: BackgroundItem[] = [
  { id: 1, name: "Studio Background 1", category: "Studio", imageUrl: "/assets/studio.png" },
  { id: 2, name: "Studio Background 2", category: "Studio", imageUrl: "/assets/studio.png" },
  { id: 3, name: "Indoor Background 1", category: "Indoor", imageUrl: "/assets/studio.png" },
  { id: 4, name: "Outdoor Background 1", category: "Outdoor", imageUrl: "/assets/studio.png" },
  { id: 5, name: "Studio Background 3", category: "Studio", imageUrl: "/assets/studio.png" },
  { id: 6, name: "Indoor Background 2", category: "Indoor", imageUrl: "/assets/studio.png" },
];

type BackgroundGalleryProps = {
  selectedBackgroundIds: Set<number>;
  setSelectedBackgroundIds: React.Dispatch<React.SetStateAction<Set<number>>>;
};

export default function BackgroundGallery({ selectedBackgroundIds, setSelectedBackgroundIds }: BackgroundGalleryProps) {
  const [activeTab, setActiveTab] = useState<"Studio" | "Indoor" | "Outdoor">("Studio");
  const selectedIds = selectedBackgroundIds;
  const setSelectedIds = setSelectedBackgroundIds;

  const currentBackgrounds = useMemo(
    () => backgrounds.filter((b) => b.category === activeTab),
    [activeTab],
  );

  const toggleSelection = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (next.size < 4) next.add(id);
      return next;
    });
  };

  const tabCounts = useMemo(
    () => ({
      Studio: backgrounds.filter((b) => b.category === "Studio").length,
      Indoor: backgrounds.filter((b) => b.category === "Indoor").length,
      Outdoor: backgrounds.filter((b) => b.category === "Outdoor").length,
    }),
    [],
  );

  return (
    <div className="flex flex-col h-full relative overflow-hidden gap-[14px]">
      <div className="relative flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl leading-[120%] font-semibold text-black-600 mb-1">
            Background Gallery
          </h2>
          <p className="text-sm leading-[140%] font-medium text-gray-600">
            Select up to 4 backgrounds
          </p>
        </div>
      </div>

      <div className="relative flex justify-between items-center">
        <div className="inline-flex rounded-lg bg-[#f2f5f8] p-1 text-sm leading-[120%] border border-gray-200 font-medium">
          <button
            type="button"
            onClick={() => setActiveTab("Studio")}
            className={`w-[133px] py-1.5 rounded-md ${activeTab === "Studio" ? "text-black-600 bg-white border border-white" : "bg-transparent text-gray-600"}`}
          >
            Studio
            <span className="text-orange-600 font-semibold rounded-full leading-[140%] text-sm ml-1 px-1 bg-[#fff3eb]">
              {tabCounts.Studio}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("Indoor")}
            className={`w-[133px] py-1.5 rounded-md ${activeTab === "Indoor" ? "text-black-600 bg-white border border-white" : "bg-transparent text-gray-600"}`}
          >
            Indoor
            <span className="text-orange-600 font-semibold rounded-full leading-[140%] text-sm ml-1 px-1 bg-[#fff3eb]">
              {tabCounts.Indoor}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("Outdoor")}
            className={`w-[133px] py-1.5 rounded-md ${activeTab === "Outdoor" ? "text-black-600 bg-white border border-white" : "bg-transparent text-gray-600"}`}
          >
            Outdoor
            <span className="text-orange-600 font-semibold rounded-full leading-[140%] text-sm ml-1 px-1 bg-[#fff3eb]">
              {tabCounts.Outdoor}
            </span>
          </button>
        </div>
      </div>

      <div className="relative overflow-y-auto mt-2 no-scrollbar pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {currentBackgrounds.map((bg) => {
            const isSelected = selectedIds.has(bg.id);
            return (
              <div
                key={bg.id}
                role="button"
                tabIndex={0}
                onClick={() => toggleSelection(bg.id)}
                onKeyDown={(e) => e.key === "Enter" && toggleSelection(bg.id)}
                className={`rounded-xl border overflow-hidden flex flex-col transition-all cursor-pointer ${
                  isSelected ? "border-orange-300 bg-[#fff3eb]" : "border-gray-200 bg-white hover:shadow-md"
                }`}
              >
                <div
                  className={`px-4 py-3.5 flex items-center justify-between border-b ${isSelected ? "border-orange-300" : "border-gray-200"}`}
                >
                  <p className="text-sm font-medium text-black-600 leading-[120%]">
                    {bg.name}
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
                    className={`rounded-xl w-full p-1.5 relative h-[18rem] overflow-hidden border ${isSelected ? "border-orange-600" : "border-gray-200"} bg-white`}
                  >
                    <Image
                      src={bg.imageUrl}
                      alt={bg.name}
                      fill
                      className="w-full h-full absolute top-0 left-0 object-cover"
                    />
                    <div className="flex justify-end items-start relative">
                      {isSelected && (
                        <Image
                          src="/assets/selected.svg"
                          alt="selected"
                          width={16}
                          height={16}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
