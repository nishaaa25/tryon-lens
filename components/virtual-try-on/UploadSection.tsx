"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function UploadSection({setFileUpload}: {setFileUpload?: (uploaded: boolean) => void}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop logic here
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 relative z-100">
      <div className="relative w-full max-w-2xl h-64 mt-10 flex items-center justify-center">
        {/* Card 1 - T-shirt on hanger (left, back) */}
        <div className="absolute left-[20%] bottom-13 -rotate-15 transform z-0">
          <div className="w-[163px] h-[194px] rounded-lg shadow-xl relative flex items-center justify-center bg-white border-6 border-white">
            <Image
              src="/assets/dummy-upload.png"
              alt="Person wearing T-shirt"
              className="object-cover w-full h-full relative"
              fill
            />
          </div>
        </div>

        {/* Card 2 - Person wearing t-shirt (center, front) */}
        <div className="absolute left-1/2 -translate-x-1/2  transform z-10">
          <div className="w-[163px] h-[194px] rounded-lg shadow-xl relative flex items-center justify-center bg-white border-6 border-white">
            <Image
              src="/assets/dummy-upload.png"
              alt="Person wearing T-shirt"
              className="object-cover w-full h-full relative"
              fill
            />
          </div>
        </div>

        {/* Card 3 - Mannequin (right, back) */}
        <div className="absolute right-[20%] bottom-13 rotate-15 transform z-0">
          <div className="w-[163px] h-[194px] rounded-lg shadow-xl relative flex items-center justify-center bg-white border-6 border-white">
            <Image
              src="/assets/dummy-upload.png"
              alt="Person wearing T-shirt"
              className="object-cover w-full h-full relative"
              fill
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 relative leading-[120%] w-7/12 pt-2 text-black-600 justify-center items-center">
        <h2 className="text-xl leading-[120%] font-semibold">
          Upload a photo to start.
        </h2>
        <p className="text-[#525866] text-center font-medium text-xs leading-[140%]">
          Drag and drop your image here (PNG, JPG, WebP, AVIF, or HEIC).
        </p>
        <button
          className={`p-3.5 bg-black-600 text-white rounded-lg w-10/12 flex justify-center items-center gap-2 hover:bg-gray-800 transition-colors font-medium text-sm `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => setFileUpload && setFileUpload(true)}
        >
          <Image
            src="/assets/export.svg"
            alt="upload icon"
            width={16}
            height={16}
          />
          <span>Upload Image</span>
        </button>
      </div>
    </div>
  );
}
