import Image from "next/image";
import React from "react";

interface GuideExample {
  label: string;
  good: boolean;
  image: string;
}

export default function ImageGuide() {
  const examples: GuideExample[] = [
    {
      label: "Evenly-Lit",
      good: true,
      image: "/assets/Images/Image 2.png",
    },
    {
      label: "Not Well Lit",
      good: false,
      image: "/assets/Images/images 1.webp",
    },
    {
      label: "Clear Product",
      good: true,
      image: "/assets/Images/Imgae 3.png",
    }
  ];

  const badExamples: GuideExample[] = [
    {
      label: "Cluttered ",
      good: false,
      image: "/assets/Images/Not to image 3.png",
    },
    {
      label: "Obstructed",
      good: false,
      image: "/assets/Images/Not to image 1.png",
    },
    {
      label: "Low Resolution",
      good: false,
      image: "/assets/Images/Not to image 2.png",
    }
  ];

  return (
    <div className="w-full relative rounded-2xl border border-border p-4  h-full leading-[120%] flex flex-col gap-4 overflow-y-auto image-gallery-bg">
      <div className="relative">
        <h3 className="text-base font-semibold text-black-600 mb-2">
          Image Guide
        </h3>
        <p className="text-sm text-gray-600 font-normal">
          Learn how to upload the best product photos to Try On Lens for
          accurate, high-quality AI results.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3 relative">
        {examples.map((example, index) => (
          <div
            key={index}
            className="relative border border-border h-50 rounded-lg p-2 flex flex-col gap-4  bg-surface"
          >
            <div className="flex gap-1 items-center relative">
              <Image
                src="/assets/tick.svg"
                alt="tick"
                width={16}
                height={16}
                className=""
              />
              <span className="text-xs font-medium text-black-600">
                {example.label}
              </span>
            </div>
            <div className="w-full relative h-full rounded-md overflow-hidden">
              <Image
                src={example.image}
                alt="placeholder"
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-alert-bg p-[10px] w-full flex gap-2 rounded-lg text-sm font-semibold leading-[120%] text-black-600 mt-2 gap-[6px]">
        <Image
          src="/assets/red-cross.svg"
          alt="red-cross"
          width={16}
          height={16}
          className=""
        />
        What not to do
      </div>
      <div className="grid grid-cols-3 gap-3 w-full relative">
        {badExamples.map((example, index) => (
          <div
            key={index}
            className="relative border border-border h-50 rounded-lg p-2 flex flex-col gap-4  bg-surface"
          >
            <div className="flex gap-1 items-center relative">
              <Image
                src="/assets/red-cross.svg"
                alt="red-cross"
                width={16}
                height={16}
                className=""
              />
              <span className="text-xs font-medium text-black-600">
                {example.label}
              </span>
            </div>
            <div className="w-full relative h-full rounded-md overflow-hidden">
              <Image
                src={example.image}
                alt="placeholder"
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
