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
import { womenModels, menModels, girlModels, boyModels } from "@/lib/data";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePage() {
  const [activeStep, setActiveStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [customModels, setCustomModels] = useState<any[]>([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [topBackUrl, setTopBackUrl] = useState<string | null>(null);
  const [bottomFrontUrl, setBottomFrontUrl] = useState<string | null>(null);
  const [bottomBackUrl, setBottomBackUrl] = useState<string | null>(null);
  const [fullBodyFrontUrl, setFullBodyFrontUrl] = useState<string | null>(null);
  const [fullBodyBackUrl, setFullBodyBackUrl] = useState<string | null>(null);
  const [productType, setProductType] = useState<"Upper body" | "Lower body" | "Full body">("Upper body");
  const [hasReachedStepOneForm, setHasReachedStepOneForm] = useState(false);
  const [selectedModelIds, setSelectedModelIds] = useState<Set<string>>(new Set());
  const [selectedPoseKeys, setSelectedPoseKeys] = useState<Set<string>>(new Set());
  const [selectedBackgroundIds, setSelectedBackgroundIds] = useState<Set<number>>(new Set());
  const [projectName, setProjectName] = useState("Untitled Project");
  const hasAnyInitialUpload =
    !!uploadedImageUrl || !!bottomFrontUrl || !!fullBodyFrontUrl;
  const showStepOneForm = hasAnyInitialUpload || hasReachedStepOneForm;
  const uploadedImageUrlRef = useRef(uploadedImageUrl);
  const topBackUrlRef = useRef(topBackUrl);
  const bottomFrontUrlRef = useRef(bottomFrontUrl);
  const bottomBackUrlRef = useRef(bottomBackUrl);
  const fullBodyFrontUrlRef = useRef(fullBodyFrontUrl);
  const fullBodyBackUrlRef = useRef(fullBodyBackUrl);

  useEffect(() => {
    uploadedImageUrlRef.current = uploadedImageUrl;
  }, [uploadedImageUrl]);

  useEffect(() => {
    topBackUrlRef.current = topBackUrl;
  }, [topBackUrl]);

  useEffect(() => {
    bottomFrontUrlRef.current = bottomFrontUrl;
  }, [bottomFrontUrl]);

  useEffect(() => {
    bottomBackUrlRef.current = bottomBackUrl;
  }, [bottomBackUrl]);

  useEffect(() => {
    fullBodyFrontUrlRef.current = fullBodyFrontUrl;
  }, [fullBodyFrontUrl]);

  useEffect(() => {
    fullBodyBackUrlRef.current = fullBodyBackUrl;
  }, [fullBodyBackUrl]);

  const allModels = useMemo(() => [...womenModels, ...menModels, ...girlModels, ...boyModels, ...customModels], [customModels]);
  const selectedModels = useMemo(
    () =>
      Array.from(selectedModelIds)
        .map((id) => allModels.find((m) => m.id === id))
        .filter(Boolean) as (typeof womenModels)[number][],
    [selectedModelIds, allModels],
  );

  const hasStepOneSelection =
    productType === "Upper body"
      ? !!uploadedImageUrl || !!topBackUrl
      : productType === "Lower body"
        ? !!bottomFrontUrl || !!bottomBackUrl
        : !!fullBodyFrontUrl || !!fullBodyBackUrl;
  const hasStepTwoSelection = selectedModelIds.size >= 1;
  const hasStepThreeSelection = selectedPoseKeys.size >= 1;
  const hasStepFourSelection = selectedBackgroundIds.size >= 1;

  const canGoToNextStep =
    activeStep === 1
      ? hasStepOneSelection
      : activeStep === 2
        ? hasStepTwoSelection
        : activeStep === 3
          ? hasStepThreeSelection
          : activeStep === 4
            ? hasStepFourSelection
            : false;

  const maxReachableStep = !hasStepOneSelection
    ? 1
    : !hasStepTwoSelection
      ? 2
      : !hasStepThreeSelection
        ? 3
        : !hasStepFourSelection
          ? 4
          : 5;

  useEffect(() => {
    if (!hasAnyInitialUpload) return;
    const t = setTimeout(() => setHasReachedStepOneForm(true), 0);
    return () => clearTimeout(t);
  }, [hasAnyInitialUpload]);

  const setProductTypeAndClearPoses = (t: "Upper body" | "Lower body" | "Full body") => {
    setProductType(t);
    setSelectedPoseKeys(new Set());
  };

  // Revoke blob URLs only on unmount (swap moves URLs, so we don't revoke on change)
  useEffect(() => {
    return () => {
      [uploadedImageUrlRef, topBackUrlRef, bottomFrontUrlRef, bottomBackUrlRef, fullBodyFrontUrlRef, fullBodyBackUrlRef].forEach((ref) => {
        if (ref.current?.startsWith("blob:")) URL.revokeObjectURL(ref.current);
      });
    };
  }, []);

  const handleStepChange = (step: number) => {
    if (step <= maxReachableStep) {
      setDirection(step > activeStep ? 1 : -1);
      setActiveStep(step);
    }
  };

  const handleUploadSectionImage = (url: string) => {
    if (productType === "Upper body") setUploadedImageUrl(url);
    else if (productType === "Lower body") setBottomFrontUrl(url);
    else setFullBodyFrontUrl(url);
  };

  return (
    <>
      <div className="p-4 sm:p-6 relative h-full min-h-0 flex flex-col gap-3 sm:gap-4 rounded-tl-2xl overflow-hidden w-full border border-border">
        <div className="absolute inset-0 w-full page-pattern" aria-hidden />
        {/* Main Content Area */}
        <div className="relative z-10 w-full min-w-0 flex flex-col flex-1 min-h-0 gap-3 sm:gap-4 overflow-hidden">
          <div className="shrink-0">
            <ProgressStepper
              activeStep={activeStep}
              onStepChange={handleStepChange}
              completedSteps={{
                1: hasStepOneSelection,
                2: hasStepTwoSelection,
                3: hasStepThreeSelection,
                4: hasStepFourSelection,
                5: activeStep === 5,
              }}
            />
          </div>
          <div className="relative w-full flex-1 min-h-0 flex flex-col lg:flex-row gap-3 sm:gap-4 overflow-hidden">
            <div
              className={`${showStepOneForm || activeStep >= 2 ? "w-full" : "w-full lg:w-7/12"} min-h-0 flex-1 bg-linear-to-br from-surface to-surface-tint z-50 rounded-2xl border border-border relative overflow-hidden`}
            >
              <div className="absolute inset-0 h-full w-full z-50 rounded-2xl content-card-grid opacity-60" />
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
                src="/assets/green.svg"
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
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={activeStep}
                  custom={direction}
                  variants={{
                    hidden: (dir: number) => ({ opacity: 0, x: dir > 0 ? 20 : -20 }),
                    visible: { opacity: 1, x: 0 },
                    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -20 : 20 }),
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={`relative z-60 w-full h-full p-4 sm:p-6 overflow-y-auto ${[2, 3, 4].includes(activeStep) ? "pb-0 sm:pb-0" : ""}`}
                >
                  {activeStep === 1 && (
                    <AnimatePresence mode="wait">
                      {!showStepOneForm ? (
                        <motion.div
                          key="upload"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="w-full h-full"
                        >
                          <UploadSection
                            productType={productType}
                            setProductType={setProductTypeAndClearPoses}
                            onImageUpload={handleUploadSectionImage}
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="form"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="w-full h-full"
                        >
                          <StepOneForm
                            productType={productType}
                            setProductType={setProductTypeAndClearPoses}
                            uploadedImageUrl={uploadedImageUrl}
                            setUploadedImageUrl={setUploadedImageUrl}
                            topBackUrl={topBackUrl}
                            setTopBackUrl={setTopBackUrl}
                            bottomFrontUrl={bottomFrontUrl}
                            setBottomFrontUrl={setBottomFrontUrl}
                            bottomBackUrl={bottomBackUrl}
                            setBottomBackUrl={setBottomBackUrl}
                            fullBodyFrontUrl={fullBodyFrontUrl}
                            setFullBodyFrontUrl={setFullBodyFrontUrl}
                            fullBodyBackUrl={fullBodyBackUrl}
                            setFullBodyBackUrl={setFullBodyBackUrl}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                  {activeStep === 2 && (
                    <ModelsGallery
                      selectedModelIds={selectedModelIds}
                      setSelectedModelIds={setSelectedModelIds}
                      customModels={customModels}
                      setCustomModels={setCustomModels}
                      productType={productType}
                    />
                  )}
                  {activeStep === 3 && (
                    <PosesGallery
                      productType={productType}
                      selectedModels={selectedModels}
                      selectedPoseKeys={selectedPoseKeys}
                      setSelectedPoseKeys={setSelectedPoseKeys}
                    />
                  )}
                  {activeStep === 4 && (
                    <BackgroundGallery
                      selectedBackgroundIds={selectedBackgroundIds}
                      setSelectedBackgroundIds={setSelectedBackgroundIds}
                    />
                  )}
                  {activeStep === 5 && (
                    <Summary
                      productType={productType}
                      productImages={{
                        topFront: uploadedImageUrl,
                        topBack: topBackUrl,
                        bottomFront: bottomFrontUrl,
                        bottomBack: bottomBackUrl,
                        fullBodyFront: fullBodyFrontUrl,
                        fullBodyBack: fullBodyBackUrl,
                      }}
                      selectedModels={selectedModels}
                      selectedPoseKeys={selectedPoseKeys}
                      selectedBackgroundIds={selectedBackgroundIds}
                      projectName={projectName}
                      onProjectNameChange={setProjectName}
                      onGoToModelsStep={() => { setDirection(-1); setActiveStep(2); }}
                      onGoToPosesStep={() => { setDirection(-1); setActiveStep(3); }}
                      onGoToBackgroundStep={() => { setDirection(-1); setActiveStep(4); }}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            <div
              className={`${showStepOneForm || activeStep >= 2 ? "hidden" : "hidden lg:flex"} lg:w-5/12 h-full relative items-start shrink-0`}
            >
              <ImageGuide />
            </div>
          </div>
          <div
            className={`${showStepOneForm || activeStep >= 2 ? "flex" : "hidden"} relative w-full shrink-0 box-gradient border border-border flex flex-row items-center justify-between p-2 sm:p-4 rounded-2xl gap-2`}
          >
            <button
              type="button"
              onClick={() => {
                setDirection(-1);
                setActiveStep((s) => Math.max(1, s - 1));
              }}
              disabled={activeStep === 1}
              className="px-2 py-2 sm:px-[14px] sm:py-3 border border-border-muted text-black-600 gap-1.5 sm:gap-2 rounded-md flex justify-center items-center leading-[120%] font-medium text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors shrink-0"
            >
              <Image
                src="/assets/prev.svg"
                alt="previous step"
                width={16}
                height={16}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              />
              <span>Previous</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setDirection(1);
                setActiveStep((s) => Math.min(5, s + 1));
              }}
              disabled={activeStep === 5 || !canGoToNextStep}
              className="px-2 py-2 sm:px-[14px] sm:py-3 bg-black-600 border border-black-600 gap-1.5 sm:gap-2 text-white rounded-md flex justify-center items-center leading-[120%] font-medium text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors shrink-0"
            >
              <span>{activeStep === 5 ? "Generate" : "Next Step"}</span>
              <Image
                src="/assets/right-arrow.svg"
                alt="next step"
                width={16}
                height={16}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
