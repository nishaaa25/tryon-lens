"use client";

import Image from "next/image";
import React from "react";

type DataModel = {
  id: string;
  frontImage: string;
  modelPoses?: { poseName: string; viewType: string; imageUrl: string }[];
};

type PosesGalleryProps = {
  selectedModels: DataModel[];
};

export default function PosesGallery({ selectedModels }: PosesGalleryProps) {
  const [selectedPoseKeys, setSelectedPoseKeys] = React.useState<Set<string>>(new Set());

  const togglePoseSelection = (modelId: string, poseIndex: number) => {
    const key = `${modelId}-${poseIndex}`;
    setSelectedPoseKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else if (next.size < 4) next.add(key);
      return next;
    });
  };

  const allPoses = React.useMemo(() => {
    const list: { key: string; modelId: string; poseIndex: number; imageUrl: string }[] = [];
    selectedModels.forEach((model) => {
      (model.modelPoses ?? []).forEach((pose, poseIndex) => {
        list.push({
          key: `${model.id}-${poseIndex}`,
          modelId: model.id,
          poseIndex,
          imageUrl: pose.imageUrl,
        });
      });
    });
    return list;
  }, [selectedModels]);

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
          <p className="text-sm leading-[140%] font-medium text-gray-600 mb-[14px]">
            Select upto 4 poses
          </p>
        </div>
        <div className="flex items-center gap-2">
          {[0, 1, 2, 3].map((idx) => {
            const poseImageUrl = selectedPosesPreview[idx];
            return (
              <div
                key={idx}
                className="h-12 w-12 rounded-md border border-gray-200 overflow-hidden relative bg-[#f2f5f8] shrink-0"
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {allPoses.map(({ key, modelId, poseIndex, imageUrl }) => {
              const isSelected = selectedPoseKeys.has(key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => togglePoseSelection(modelId, poseIndex)}
                  className={`${isSelected ? "border-orange-300 bg-[#fff3eb]" : "border-gray-200 bg-white"} border p-4 rounded-xl gap-4 overflow-hidden`}
                >
                  <div
                    className={`rounded-xl p-1.5 relative h-[20rem] overflow-hidden ${isSelected ? "border border-orange-600" : "border border-gray-200"}`}
                  >
                    <Image
                      src={imageUrl}
                      alt=""
                      fill
                      className="w-full absolute top-0 left-0 object-cover"
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
