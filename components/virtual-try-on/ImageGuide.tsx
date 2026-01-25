import Image from "next/image";
import React from "react";

interface GuideExample {
  icon: string;
  label: string;
  good: boolean;
  description: string;
}

export default function ImageGuide() {
  const examples: GuideExample[] = [
    {
      icon: "☀️",
      label: "Evenly-Lit",
      good: true,
      description: "",
    },
    {
      icon: "🌑",
      label: "Not Well Lit",
      good: false,
      description: "Shadows make it hard for the AI to interpret colours.",
    },
    {
      icon: "📸",
      label: "Clear Photo of Product",
      good: true,
      description: "",
    },
    {
      icon: "🙅",
      label: "Product Obscured",
      good: false,
      description: "The folded arms are covering the product.",
    },
    {
      icon: "🙅",
      label: "Product Obscured",
      good: false,
      description: "The folded arms are covering the product.",
    },
    {
      icon: "🙅",
      label: "Product Obscured",
      good: false,
      description: "The folded arms are covering the product.",
    },
  ];

  return (
    <div className="w-full relative rounded-2xl border border-gray-200 p-4  h-full leading-[120%] flex flex-col gap-4 overflow-y-auto image-gallery-bg">
      <div className="relative">
        <h3 className="text-base font-semibold text-black-600 mb-2">
          Image Guide
        </h3>
        <p className="text-sm text-gray-600 font-normal">
          Learn how to upload the best product photos to Try On Lens for
          accurate, high-quality AI results.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 relative">
        {examples.map((example, index) => (
          <div
            key={index}
            className="relative border border-gray-200 h-66 rounded-lg p-2 flex flex-col gap-4  bg-white"
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
                src="/assets/dummy-upload.png"
                alt="placeholder"
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[#E9354417] p-[10px] w-full flex gap-2 rounded-lg text-sm font-semibold leading-[120%] text-black-600 mt-2 gap-[6px]">
        <Image
          src="/assets/tick.svg"
          alt="tick"
          width={16}
          height={16}
          className=""
        />
        What not to do
      </div>
      <div className="grid grid-cols-2 gap-3 w-full relative">
        {examples.map((example, index) => (
          <div
            key={index}
            className="relative border border-gray-200 h-66 rounded-lg p-2 flex flex-col gap-4  bg-white"
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
                src="/assets/dummy-upload.png"
                alt="placeholder"
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="relative">
        <h3 className="text-base font-semibold text-black-600 mb-2">
          Adding Angles Guide
        </h3>
        <p className="text-sm text-gray-600 font-normal">
          We currently support diagonal front and back angles of the model. Side angles are not yet supported.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 relative">
        {examples.map((example, index) => (
          <div
            key={index}
            className="relative border border-gray-200 h-66 rounded-lg p-2 flex flex-col gap-4  bg-white"
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
                src="/assets/dummy-upload.png"
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
