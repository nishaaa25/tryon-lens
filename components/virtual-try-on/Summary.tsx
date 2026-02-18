"use client";

import Image from "next/image";
import { useMemo } from "react";
import { backgrounds } from "@/components/virtual-try-on/BackgroundGallery";

type ProductImages = {
  topFront: string | null;
  topBack: string | null;
  bottomFront: string | null;
  bottomBack: string | null;
};

type DataModel = {
  id: string;
  frontImage: string;
  modelPoses?: { poseName: string; viewType: string; imageUrl: string }[];
};

type SummaryProps = {
  productImages: ProductImages;
  selectedModels: DataModel[];
  selectedPoseKeys: Set<string>;
  selectedBackgroundIds: Set<number>;
};

export default function Summary({
  productImages,
  selectedModels,
  selectedPoseKeys,
  selectedBackgroundIds,
}: SummaryProps) {
  const selectedPoseImageUrls = useMemo(() => {
    const keyToUrl: Record<string, string> = {};
    selectedModels.forEach((model) => {
      (model.modelPoses ?? []).forEach((pose, poseIndex) => {
        keyToUrl[`${model.id}-${poseIndex}`] = pose.imageUrl;
      });
    });
    return Array.from(selectedPoseKeys)
      .map((key) => keyToUrl[key])
      .filter(Boolean) as string[];
  }, [selectedModels, selectedPoseKeys]);

  const selectedBackgrounds = useMemo(
    () => backgrounds.filter((b) => selectedBackgroundIds.has(b.id)),
    [selectedBackgroundIds],
  );

  const productSlots = [
    { label: "Top Front", url: productImages.topFront },
    { label: "Top Back", url: productImages.topBack },
    { label: "Bottom Front", url: productImages.bottomFront },
    { label: "Bottom Back", url: productImages.bottomBack },
  ] as const;

  const modelCount = selectedModels.length;
  const poseCount = selectedPoseImageUrls.length;
  const photoCount = poseCount * (selectedBackgrounds.length || 1);

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
          <div className="grid grid-cols-2 gap-4 px-4 pb-4 overflow-y-auto no-scrollbar">
            {productSlots.map(({ label, url }) => (
              <div key={label} className="relative flex flex-col gap-2">
                <h4 className="text-sm leading-[140%] font-medium text-gray-600">
                  {label}
                </h4>
                {url ? (
                  <div className="rounded-xl relative overflow-hidden w-full h-[22rem] product-bg border border-gray-200">
                    <img
                      src={url}
                      alt={label}
                      className="w-full h-full object-contain scale-[0.9]"
                    />
                  </div>
                ) : (
                  <div className="rounded-xl w-full h-[22rem] border border-gray-200 bg-[#f2f5f8] flex items-center justify-center">
                    <p className="text-sm font-medium text-gray-500">No image uploaded</p>
                  </div>
                )}
              </div>
            ))}
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
              <div className="grid grid-cols-2 gap-3 relative">
                {selectedModels.length === 0 ? (
                  <div className="rounded-md relative overflow-hidden w-full h-[9rem]  border border-gray-200 bg-[#f2f5f8]" />
                ) : (
                  selectedModels.map((model) => (
                    <div key={model.id} className="flex flex-col gap-2 w-full relative">
                      <div className="rounded-md relative overflow-hidden w-full h-[9rem]  border border-gray-200">
                        <Image
                          src={model.frontImage}
                          alt={model.id}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-[2px]">
                        <h4 className="text-sm leading-[120%] font-semibold text-black-600">
                          {model.id}
                        </h4>
                        <p className="text-sm leading-[140%] text-gray-600 font-medium">
                          Size: Medium (M)
                        </p>
                      </div>
                    </div>
                  ))
                )}
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
                {[0, 1, 2, 3].map((idx) => {
                  const poseImageUrl = selectedPoseImageUrls[idx];
                  return (
                    <div
                      key={idx}
                      className="flex flex-col gap-2 w-full relative"
                    >
                      <div className="rounded-md relative overflow-hidden w-full h-[9rem]  border border-gray-200">
                        {poseImageUrl ? (
                          <Image
                            src={poseImageUrl}
                            alt="Pose"
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#f2f5f8]" />
                        )}
                      </div>
                    </div>
                  );
                })}
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
              <div className="flex flex-col gap-3 relative">
                {selectedBackgrounds.length === 0 ? (
                  <div className="flex flex-col gap-2 w-full relative">
                    <div className="rounded-md relative overflow-hidden w-full h-[15rem]  border border-gray-200 bg-[#f2f5f8]" />
                  </div>
                ) : (
                  selectedBackgrounds.map((bg) => (
                    <div key={bg.id} className="flex flex-col gap-2 w-full relative">
                      <div className="rounded-md relative overflow-hidden w-full h-[15rem]  border border-gray-200">
                        <Image
                          src={bg.imageUrl}
                          alt={bg.name}
                          fill
                          className="object-cover"
                        />
                        <p className="px-2 py-1 absolute bottom-1 left-1 rounded-full text-gray-600 bg-white border border-gray-200 text-xs leading-[120%]">
                          {bg.name}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="px-4 py-3 relative border-t border-gray-200 bg-[#f7f5fa]">
            <div className="text-sm flex justify-between items-center leading-[140%] text-gray-600 font-medium mb-2">
              <p>
                {modelCount} model{modelCount !== 1 ? "s" : ""} x {poseCount} pose{poseCount !== 1 ? "s" : ""}
              </p>
              <p>{photoCount} photos</p>
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
