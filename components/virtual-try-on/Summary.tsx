"use client";

import Image from "next/image";
import { useMemo, useState, useRef, useEffect } from "react";
import type { ProductType } from "@/components/StepOneForm";
import { backgrounds } from "@/components/virtual-try-on/BackgroundGallery";

type ProductImages = {
  topFront: string | null;
  topBack: string | null;
  bottomFront: string | null;
  bottomBack: string | null;
  fullBodyFront: string | null;
  fullBodyBack: string | null;
};

type DataModel = {
  id: string;
  frontImage: string;
  modelPoses?: { poseName: string; viewType: string; imageUrl: string }[];
};

type SummaryProps = {
  productType: ProductType;
  productImages: ProductImages;
  selectedModels: DataModel[];
  selectedPoseKeys: Set<string>;
  selectedBackgroundIds: Set<number>;
  projectName: string;
  onProjectNameChange: (name: string) => void;
  onGoToModelsStep: () => void;
  onGoToPosesStep: () => void;
  onGoToBackgroundStep: () => void;
};

export default function Summary({
  productType,
  productImages,
  selectedModels,
  selectedPoseKeys,
  selectedBackgroundIds,
  projectName,
  onProjectNameChange,
  onGoToModelsStep,
  onGoToPosesStep,
  onGoToBackgroundStep,
}: SummaryProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState(projectName);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditNameValue(projectName);
  }, [projectName]);

  useEffect(() => {
    if (isEditingName) nameInputRef.current?.focus();
  }, [isEditingName]);

  const saveProjectName = () => {
    const trimmed = editNameValue.trim();
    if (trimmed) onProjectNameChange(trimmed);
    setIsEditingName(false);
  };
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

  const productSlots = useMemo(() => {
    if (productType === "Upper body")
      return [
        { label: "Upper Front", url: productImages.topFront },
        { label: "Upper Back", url: productImages.topBack },
      ] as const;
    if (productType === "Lower body")
      return [
        { label: "Lower Front", url: productImages.bottomFront },
        { label: "Lower Back", url: productImages.bottomBack },
      ] as const;
    return [
      { label: "Full Body Front", url: productImages.fullBodyFront },
      { label: "Full Body Back", url: productImages.fullBodyBack },
    ] as const;
  }, [productType, productImages]);

  const modelCount = selectedModels.length;
  const poseCount = selectedPoseImageUrls.length;
  const photoCount = poseCount * (selectedBackgrounds.length || 1);

  return (
    <div className="flex flex-col h-full flex-1 overflow-hidden gap-3.5 relative">
      <h2 className="text-xl leading-[120%] font-semibold text-black-600 mb-1 shrink-0">
        Summary
      </h2>
      <div className="flex flex-col lg:flex-row justify-center items-stretch gap-4 lg:gap-5 relative flex-1 lg:overflow-hidden no-scrollbar">
        <div className="flex flex-col border gap-4 w-full lg:w-[73%] border-border rounded-2xl bg-surface lg:h-full shrink-0 lg:shrink min-h-0">
          <h3 className="text-base leading-[120%] p-4 border-b border-border font-semibold text-black-600 shrink-0">
            Product Images
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 px-3 sm:px-4 pb-4 min-h-0">
            {productSlots.map(({ label, url }) => (
              <div key={label} className="relative flex flex-col gap-2">
                <h4 className="text-sm leading-[140%] font-medium text-gray-600">
                  {label}
                </h4>
                {url ? (
                  <div className="rounded-xl relative overflow-hidden w-full h-64 sm:h-[22rem] product-bg border border-border">
                    <img
                      src={url}
                      alt={label}
                      className="w-full h-full object-contain scale-[0.9]"
                    />
                  </div>
                ) : (
                  <div className="rounded-xl w-full h-64 sm:h-[22rem] border border-border bg-surface-muted flex items-center justify-center">
                    <p className="text-sm font-medium text-gray-500">No image uploaded</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col border w-full lg:w-[27%] border-border rounded-2xl overflow-hidden bg-surface lg:h-full min-h-0 shrink-0 lg:shrink ">
          <div className="text-base leading-[120%] p-4 border-b border-border font-semibold text-black-600 mb-1 flex items-center gap-1 flex-wrap">
            {isEditingName ? (
              <input
                ref={nameInputRef}
                type="text"
                value={editNameValue}
                onChange={(e) => setEditNameValue(e.target.value)}
                onBlur={saveProjectName}
                onKeyDown={(e) => e.key === "Enter" && saveProjectName()}
                className="flex-1 min-w-0 border border-border rounded px-2 py-1 text-black-600 bg-surface focus:outline-none focus:ring-2 focus:ring-orange-600/30"
              />
            ) : (
              <>
                <span className="truncate">{projectName}</span>
                <button
                  type="button"
                  onClick={() => setIsEditingName(true)}
                  className="shrink-0 p-0.5 rounded hover:bg-surface-muted"
                  aria-label="Edit project name"
                >
                  <Image
                    src="/assets/edit.svg"
                    alt="edit"
                    width={16}
                    height={16}
                    className="inline-block"
                  />
                </button>
              </>
            )}
          </div>
          <div className="p-3 sm:p-4 relative flex flex-col gap-4 overflow-y-auto no-scrollbar">
            <div className="flex flex-col gap-2 border-b pb-4 border-border">
              <div className="flex items-center gap-1 mb-1">
                <h3 className="text-sm leading-[120%] font-medium text-black-600">
                  Models
                </h3>
                <button
                  type="button"
                  onClick={onGoToModelsStep}
                  className="p-0.5 rounded hover:bg-surface-muted"
                  aria-label="Edit models"
                >
                  <Image
                    src="/assets/edit.svg"
                    alt="edit"
                    width={16}
                    height={16}
                    className="inline-block"
                  />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 relative">
                {selectedModels.length === 0 ? (
                  <div className="rounded-md relative overflow-hidden w-full h-[9rem]  border border-border bg-surface-muted" />
                ) : (
                  selectedModels.map((model) => (
                    <div key={model.id} className="flex flex-col gap-2 w-full relative">
                      <div className="rounded-md relative overflow-hidden w-full h-[9rem]  border border-border">
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
            <div className="flex flex-col gap-2 pb-4 border-b border-border">
              <div className="flex items-center gap-1 mb-1">
                <h3 className="text-sm leading-[120%] font-medium text-black-600">
                  Poses
                </h3>
                <button
                  type="button"
                  onClick={onGoToPosesStep}
                  className="p-0.5 rounded hover:bg-surface-muted"
                  aria-label="Edit poses"
                >
                  <Image
                    src="/assets/edit.svg"
                    alt="edit"
                    width={16}
                    height={16}
                    className="inline-block"
                  />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-3 relative">
                {[0, 1, 2, 3].map((idx) => {
                  const poseImageUrl = selectedPoseImageUrls[idx];
                  return (
                    <div
                      key={idx}
                      className="flex flex-col gap-2 w-full relative"
                    >
                      <div className="rounded-md relative overflow-hidden w-full h-[9rem]  border border-border">
                        {poseImageUrl ? (
                          <Image
                            src={poseImageUrl}
                            alt="Pose"
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-surface-muted" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1 mb-1">
                <h3 className="text-sm leading-[120%] font-medium text-black-600">
                  Background
                </h3>
                <button
                  type="button"
                  onClick={onGoToBackgroundStep}
                  className="p-0.5 rounded hover:bg-surface-muted"
                  aria-label="Edit background"
                >
                  <Image
                    src="/assets/edit.svg"
                    alt="edit"
                    width={16}
                    height={16}
                    className="inline-block"
                  />
                </button>
              </div>
              <div className="flex flex-col gap-3 relative">
                {selectedBackgrounds.length === 0 ? (
                  <div className="flex flex-col gap-2 w-full relative">
                    <div className="rounded-md relative overflow-hidden w-full h-[15rem]  border border-border bg-surface-muted" />
                  </div>
                ) : (
                  selectedBackgrounds.map((bg) => (
                    <div key={bg.id} className="flex flex-col gap-2 w-full relative">
                      <div className="rounded-md relative overflow-hidden w-full h-[15rem]  border border-border">
                        <Image
                          src={bg.imageUrl}
                          alt={bg.name}
                          fill
                          className="object-cover"
                        />
                        <p className="px-2 py-1 absolute bottom-1 left-1 rounded-full text-gray-600 bg-surface border border-border text-xs leading-[120%]">
                          {bg.name}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="px-4 py-3 relative border-t border-border bg-surface-footer">
            <div className="text-sm flex justify-between items-center leading-[140%] text-gray-600 font-medium mb-2">
              <p>
                {modelCount} model{modelCount !== 1 ? "s" : ""} x {poseCount} pose{poseCount !== 1 ? "s" : ""}
              </p>
              <p>{photoCount} photos</p>
            </div>
            {/* <div className="flex justify-between items-center text-base leading-[120%] font-semibold text-black-600">
              <h4>Total</h4>
              <p>$199.99</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
