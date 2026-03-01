"use client";

import Image from "next/image";
import React from "react";
import type { ProductType } from "@/components/StepOneForm";

type DataModel = {
  id: string;
  frontImage: string;
  modelPoses?: { poseName: string; viewType: string; imageUrl: string }[];
};

type PosesGalleryProps = {
  productType: ProductType;
  selectedModels: DataModel[];
  selectedPoseKeys: Set<string>;
  setSelectedPoseKeys: React.Dispatch<React.SetStateAction<Set<string>>>;
};

function poseMatchesProductType(viewType: string, productType: ProductType): boolean {
  const v = viewType.toLowerCase();
  if (productType === "Upper body") return v.includes("waist-up");
  if (productType === "Full body") return v.includes("full body");
  if (productType === "Lower body") return v.includes("three-quarter") || v.includes("above knees") || v.includes("knees");
  return true;
}

export default function PosesGallery({ productType, selectedModels, selectedPoseKeys, setSelectedPoseKeys }: PosesGalleryProps) {
  const togglePoseSelection = (modelId: string, poseIndex: number) => {
    const key = `${modelId}-${poseIndex}`;
    setSelectedPoseKeys((prev) => {
      if (prev.has(key)) return new Set<string>();
      return new Set([key]);
    });
  };

  const allPoses = React.useMemo(() => {
    const list: { key: string; modelId: string; poseIndex: number; imageUrl: string }[] = [];
    const unfiltered: { key: string; modelId: string; poseIndex: number; imageUrl: string }[] = [];
    selectedModels.forEach((model) => {
      (model.modelPoses ?? []).forEach((pose, poseIndex) => {
        const entry = {
          key: `${model.id}-${poseIndex}`,
          modelId: model.id,
          poseIndex,
          imageUrl: pose.imageUrl,
        };
        unfiltered.push(entry);
        if (poseMatchesProductType(pose.viewType, productType)) list.push(entry);
      });
    });
    return list.length > 0 ? list : unfiltered;
  }, [selectedModels, productType]);

  const keyToImageUrl = React.useMemo(
    () => Object.fromEntries(allPoses.map((p) => [p.key, p.imageUrl])),
    [allPoses],
  );
  const selectedPosesPreview = React.useMemo(
    () => Array.from(selectedPoseKeys).map((key) => keyToImageUrl[key]).filter(Boolean) as string[],
    [selectedPoseKeys, keyToImageUrl],
  );

  return (
    <div className="flex flex-col h-full relative overflow-hidden gap-5">
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl leading-[120%] font-semibold text-black-600 mb-1">
            Poses Gallery
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {[0].map((idx) => {
            const poseImageUrl = selectedPosesPreview[idx];
            return (
              <div
                key={idx}
                className="h-12 w-12 rounded-md border border-border overflow-hidden relative bg-surface-muted shrink-0"
              >
                {poseImageUrl ? (
                  <Image
                    src={poseImageUrl}
                    alt="Selected pose"
                    fill
                    className="object-cover"
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative h-full w-full overflow-auto no-scrollbar pb-4">
        {allPoses.length === 0 ? (
          <p className="text-gray-600 font-medium">
            Select models in the previous step to see their poses here.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {allPoses.map(({ key, modelId, poseIndex, imageUrl }) => {
              const isSelected = selectedPoseKeys.has(key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => togglePoseSelection(modelId, poseIndex)}
                  className={`${isSelected ? "border-orange-300 bg-surface-tint" : "border-border bg-surface"} border p-4 rounded-xl gap-4 overflow-hidden`}
                >
                  <div
                    className={`rounded-xl p-1.5 relative h-[14rem] sm:h-[16rem] md:h-[20rem] overflow-hidden ${isSelected ? "border border-orange-600" : "border border-border"}`}
                  >
                    <Image
                      src={imageUrl}
                      alt=""
                      fill
                      className="w-full absolute top-0 left-0 object-cover"
                    />
                    <div className="relative flex justify-between items-start">
                      <div className="relative bg-surface p-1.5 rounded-full flex justify-center items-center border border-border w-7 h-7 hidden">
                        <Image
                          src="/assets/like.svg"
                          alt="like icon"
                          width={16}
                          height={16}
                        />
                      </div>
                      {isSelected && (
                        <Image
                          src="/assets/selected.svg"
                          alt="selected icon"
                          width={16}
                          height={16}
                          className="relative"
                        />
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
