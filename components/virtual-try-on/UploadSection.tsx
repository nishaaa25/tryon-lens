"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";

const ACCEPTED_IMAGE_TYPES = "image/png,image/jpeg,image/jpg,image/webp,image/avif,image/heic";

export default function UploadSection({
  onImageUpload,
}: {
  onImageUpload?: (imageUrl: string) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    onImageUpload?.(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) processFile(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 relative z-100">
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES}
        className="hidden"
        onChange={handleFileChange}
      />
      <div
        className={`relative w-full max-w-2xl h-64 mt-10 flex items-center justify-center rounded-xl  transition-colors ${isDragging ? "border-orange-400 bg-orange-50/50" : "border-gray-200"}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
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
          type="button"
          className="p-3.5 bg-black-600 text-white rounded-lg w-10/12 flex justify-center items-center gap-2 hover:bg-gray-800 transition-colors font-medium text-sm"
          onClick={handleUploadClick}
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
