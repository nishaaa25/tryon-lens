"use client";
import StepOneForm from "@/components/StepOneForm";
import BackgroundGallery from "@/components/virtual-try-on/BackgroundGallery";
// import CustomizeModels from "@/components/virtual-try-on/CustomizeModels";
import ImageGuide from "@/components/virtual-try-on/ImageGuide";
import ModelsGallery from "@/components/virtual-try-on/ModelsGallery";
import PosesGallery from "@/components/virtual-try-on/PosesGallery";
import ProgressStepper from "@/components/virtual-try-on/ProgressStepper";
import Summary from "@/components/virtual-try-on/Summary";
import UploadSection from "@/components/virtual-try-on/UploadSection";
import { womenModels, menModels } from "@/lib/data";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

export default function HomePage() {
  const [activeStep, setActiveStep] = useState(1);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [hasReachedStepOneForm, setHasReachedStepOneForm] = useState(false);
  const [selectedModelIds, setSelectedModelIds] = useState<Set<string>>(new Set());
  const uploadedPhoto = !!uploadedImageUrl;
  const showStepOneForm = uploadedPhoto || hasReachedStepOneForm;
  const uploadedImageUrlRef = useRef(uploadedImageUrl);
  uploadedImageUrlRef.current = uploadedImageUrl;

  const allModels = useMemo(() => [...womenModels, ...menModels], []);
  const selectedModels = useMemo(
    () =>
      Array.from(selectedModelIds)
        .map((id) => allModels.find((m) => m.id === id))
        .filter(Boolean) as (typeof womenModels)[number][],
    [selectedModelIds, allModels],
  );

  useEffect(() => {
    if (uploadedPhoto) setHasReachedStepOneForm(true);
  }, [uploadedPhoto]);

  // Revoke blob URL only on unmount (swap moves URLs, so we don't revoke on change)
  useEffect(() => {
    return () => {
      if (uploadedImageUrlRef.current?.startsWith("blob:"))
        URL.revokeObjectURL(uploadedImageUrlRef.current);
    };
  }, []);

  const handleStepChange = (step: number) => {
    console.log("Step changed to:", step);
    setActiveStep(step);
  };

  return (
    <>
      <div className="p-6 relative h-full flex flex-col gap-4 rounded-tl-2xl overflow-hidden w-full border border-gray-200">
        <div className="absolute inset-0 h-full w-full bg-[#f6f7fa] bg-[radial-gradient(#e5e7ebcc_2px,transparent_1px)] bg-size-[18px_18px]"></div>
        {/* Main Content Area */}
        <div className="relative w-full ">
          <ProgressStepper
            activeStep={activeStep}
            onStepChange={handleStepChange}
          />
        </div>
        <div className="relative z-10 w-full h-full flex flex-col md:flex-row gap-4 overflow-hidden ">
          <div
            className={`${showStepOneForm || activeStep >= 2 ? "w-full" : "w-7/12"}  h-full bg-linear-to-br from-white to-[#fff3eb] z-50 rounded-2xl border border-gray-200 relative overflow-hidden`}
          >
            <div className="absolute inset-0 h-full w-full z-50 rounded-2xl bg-[linear-gradient(to_right,#fbb58728_1px,transparent_1px),linear-gradient(to_bottom,#fbb58728_1px,transparent_1px)] opacity-60  bg-size-[24px_24px]" />
            <div className="absolute z-40 w-full h-full backdrop-blur-[30px] rounded-2xl overflow-hidden"></div>
            <Image
              src="/assets/orange.svg"
              alt="orange decoration"
              width={520}
              height={420}
              className="absolute top-0 left-0 z-10 "
            />
            <Image
              src="/assets/pink.svg"
              alt="pink decoration"
              width={500}
              height={420}
              className="absolute top-10 right-10 z-10 "
            />
            <Image
              src="/assets/greensvg"
              alt="green decoration"
              width={400}
              height={420}
              className="absolute bottom-0 right-0 z-10 "
            />
            <Image
              src="/assets/purple.svg"
              alt="purple decoration"
              width={420}
              height={300}
              className="absolute bottom-0 left-0 z-10 "
            />
            <div
              className={`${activeStep === 1 ? "relative" : "hidden"} z-60 w-full h-full p-6`}
            >
              <div className={`${showStepOneForm ? "hidden" : "block"}`}>
                <UploadSection onImageUpload={setUploadedImageUrl} />
              </div>
              <div className={`${showStepOneForm ? "block" : "hidden"}`}>
                <StepOneForm
                  uploadedImageUrl={uploadedImageUrl}
                  setUploadedImageUrl={setUploadedImageUrl}
                />
              </div>
            </div>
            <div
              className={`${activeStep === 2 ? "relative" : "hidden"} z-60 w-full h-full p-6 pb-0`}
            >
              <ModelsGallery
                selectedModelIds={selectedModelIds}
                setSelectedModelIds={setSelectedModelIds}
              />
            </div>
            {/* Customize Models step commented out for now
            <div
              className={`${activeStep === 3 ? "relative" : "hidden"} z-60 w-full h-full p-6 pb-0`}
            >
              <CustomizeModels />
            </div>
            */}
            <div
              className={`${activeStep === 3 ? "relative" : "hidden"} z-60 w-full h-full p-6 pb-0`}
            >
              <PosesGallery selectedModels={selectedModels} />
            </div>
             <div
              className={`${activeStep === 4 ? "relative" : "hidden"} z-60 w-full h-full p-6 pb-0`}
            >
              <BackgroundGallery />
            </div>
             <div
              className={`${activeStep === 5 ? "relative" : "hidden"} z-60 w-full h-full p-6`}
            >
              <Summary />
            </div>
          </div>
          <div
            className={`${showStepOneForm || activeStep >= 2 ? "hidden" : "flex"} w-5/12 h-full relative items-start`}
          >
            <ImageGuide />
          </div>
        </div>
        <div
          className={`${showStepOneForm || activeStep >= 2 ? "flex" : "hidden"} relative w-full h-19 box-gradient border border-gray-200 flex items-center justify-between p-4 rounded-2xl`}
        >
          <button
            type="button"
            onClick={() => setActiveStep((s) => Math.max(1, s - 1))}
            disabled={activeStep === 1}
            className="px-[14px] py-3 border border-[#cacfd8] text-black-600 gap-2 rounded-md w-max flex justify-center items-center leading-[120%] font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
          >
            <Image
              src="/assets/prev.svg"
              alt="previous step"
              width={16}
              height={16}
            />
            <span>Previous</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveStep((s) => Math.min(5, s + 1))}
            disabled={activeStep === 5}
            className="px-[14px] py-3 bg-black-600 border border-black-600 gap-2 text-white rounded-md w-max flex justify-center items-center leading-[120%] font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
          >
            <span>Next Step</span>
            <Image
              src="/assets/right-arrow.svg"
              alt="next step"
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>
    </>
  );
}
