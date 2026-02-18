"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const ACCEPTED_IMAGE = "image/png,image/jpeg,image/jpg,image/webp,image/avif,image/heic";

function useImageSlot() {
  const [url, setUrlState] = useState<string | null>(null);
  const setFromFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    setUrlState((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  }, []);
  const clear = useCallback(() => {
    setUrlState((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return null;
    });
  }, []);
  const setUrl = useCallback((newUrl: string | null, revokePrev = true) => {
    setUrlState((prev) => {
      if (revokePrev && prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return newUrl;
    });
  }, []);
  return [url, setFromFile, clear, setUrl] as const;
}

type ImageSlotMenuProps = {
  open: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
  onSwap: () => void;
  onRemove: () => void;
};

function ImageSlotMenu({ open, onClose, anchorRef, onSwap, onRemove }: ImageSlotMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current?.contains(e.target as Node) ||
        anchorRef.current?.contains(e.target as Node)
      )
        return;
      onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-full mt-1 z-50 min-w-[140px] py-1 bg-white border border-gray-200 rounded-lg shadow-lg"
    >
      <button
        type="button"
        onClick={() => {
          onSwap();
          onClose();
        }}
        className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
      >
        Swap
      </button>
      <button
        type="button"
        onClick={() => {
          onRemove();
          onClose();
        }}
        className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
      >
        Remove
      </button>
    </div>
  );
}

type DropZoneProps = {
  imageUrl: string | null;
  onFile: (file: File) => void;
  placeholderSrc: string;
  placeholderAlt: string;
  title: string;
  hint: string;
};

function DropZone({ imageUrl, onFile, placeholderSrc, placeholderAlt, title, hint }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    onFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
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

  const handleClick = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE}
        className="hidden"
        onChange={handleChange}
      />
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-full relative h-80 border border-dashed p-3 flex flex-col justify-center items-center gap-3.5 rounded-xl overflow-hidden cursor-pointer transition-colors ${
          isDragging ? "border-orange-400 bg-orange-50/50 border-2" : "border-[#cacfd8]"
        }`}
      >
        {imageUrl ? (
          <div className="w-full h-full relative rounded-lg overflow-hidden bg-gray-50">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <>
            <div className="w-full h-2/3 relative flex justify-center items-center">
              <Image
                src={placeholderSrc}
                alt={placeholderAlt}
                fill
                className="relative object-contain scale-95"
              />
            </div>
            <div className="flex flex-col gap-1.5 relative items-center justify-center text-center">
              <p className="text-base font-semibold leading-[120%] text-black-600">{title}</p>
              <p className="text-xs leading-[140%] font-medium w-9/12 text-gray-600">{hint}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

type DropdownId = "top-front" | "top-back" | "bottom-front" | "bottom-back" | null;

type StepOneFormProps = {
  uploadedImageUrl: string | null;
  setUploadedImageUrl: (url: string | null) => void;
  topBackUrl: string | null;
  setTopBackUrl: (url: string | null) => void;
  bottomFrontUrl: string | null;
  setBottomFrontUrl: (url: string | null) => void;
  bottomBackUrl: string | null;
  setBottomBackUrl: (url: string | null) => void;
};

export default function StepOneForm({
  uploadedImageUrl,
  setUploadedImageUrl,
  topBackUrl,
  setTopBackUrl,
  bottomFrontUrl,
  setBottomFrontUrl,
  bottomBackUrl,
  setBottomBackUrl,
}: StepOneFormProps) {
  const [selectedOption, setSelectedOption] = useState<"Top" | "Bottom">("Top");
  const [openDropdown, setOpenDropdown] = useState<DropdownId>(null);
  const topFrontDotsRef = useRef<HTMLButtonElement>(null);
  const topBackDotsRef = useRef<HTMLButtonElement>(null);
  const bottomFrontDotsRef = useRef<HTMLButtonElement>(null);
  const bottomBackDotsRef = useRef<HTMLButtonElement>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value as "Top" | "Bottom");
    setOpenDropdown(null);
  };

  const handleTopFrontFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (uploadedImageUrl?.startsWith("blob:")) URL.revokeObjectURL(uploadedImageUrl);
    setUploadedImageUrl(URL.createObjectURL(file));
  };

  const handleTopBackFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (topBackUrl?.startsWith("blob:")) URL.revokeObjectURL(topBackUrl);
    setTopBackUrl(URL.createObjectURL(file));
  };

  const handleBottomFrontFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (bottomFrontUrl?.startsWith("blob:")) URL.revokeObjectURL(bottomFrontUrl);
    setBottomFrontUrl(URL.createObjectURL(file));
  };

  const handleBottomBackFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (bottomBackUrl?.startsWith("blob:")) URL.revokeObjectURL(bottomBackUrl);
    setBottomBackUrl(URL.createObjectURL(file));
  };

  const clearAllTop = () => {
    if (topBackUrl?.startsWith("blob:")) URL.revokeObjectURL(topBackUrl);
    setTopBackUrl(null);
    setUploadedImageUrl(null);
    setOpenDropdown(null);
  };

  const clearAllBottom = () => {
    if (bottomFrontUrl?.startsWith("blob:")) URL.revokeObjectURL(bottomFrontUrl);
    if (bottomBackUrl?.startsWith("blob:")) URL.revokeObjectURL(bottomBackUrl);
    setBottomFrontUrl(null);
    setBottomBackUrl(null);
    setOpenDropdown(null);
  };

  const handleTopFrontRemove = () => setUploadedImageUrl(null);
  const handleTopFrontSwap = () => {
    const front = uploadedImageUrl;
    const back = topBackUrl;
    setUploadedImageUrl(back ?? null);
    setTopBackUrl(front);
  };

  const handleTopBackRemove = () => {
    if (topBackUrl?.startsWith("blob:")) URL.revokeObjectURL(topBackUrl);
    setTopBackUrl(null);
  };
  const handleTopBackSwap = () => handleTopFrontSwap();

  const handleBottomFrontRemove = () => {
    if (bottomFrontUrl?.startsWith("blob:")) URL.revokeObjectURL(bottomFrontUrl);
    setBottomFrontUrl(null);
  };
  const handleBottomFrontSwap = () => {
    const front = bottomFrontUrl;
    const back = bottomBackUrl;
    setBottomFrontUrl(back);
    setBottomBackUrl(front);
  };

  const handleBottomBackRemove = () => {
    if (bottomBackUrl?.startsWith("blob:")) URL.revokeObjectURL(bottomBackUrl);
    setBottomBackUrl(null);
  };
  const handleBottomBackSwap = () => handleBottomFrontSwap();

  return (
    <div className="flex flex-col w-full h-full relative z-100 leading-[120%] gap-5">
      <div className="relative w-full flex justify-between items-center">
        <h3 className="text-xl font-semibold text-black-600">Product Photo</h3>
        <select
          className="w-fit bg-white border border-gray-200 rounded-md px-3 py-[10px] text-sm text-black-600 font-medium"
          onChange={handleSelectChange}
          value={selectedOption}
        >
          <option value="Top">Top</option>
          <option value="Bottom">Bottom</option>
        </select>
      </div>

      {/* Top */}
      <div className={`relative w-full ${selectedOption === "Top" ? "block" : "hidden"}`}>
        <div className="rounded-xl w-full relative overflow-hidden border border-gray-200 bg-white">
          <div className="flex justify-between items-center relative p-4 border-b border-gray-200">
            <h4 className="text-base leading-[120%] text-black-600 font-semibold">Top</h4>
            <button
              type="button"
              onClick={clearAllTop}
              className="text-sm text-gray-600 font-medium leading-[140%] flex gap-1 hover:text-black-600"
            >
              <Image src="/assets/bin.svg" alt="bin" width={16} height={16} />
              Clear All Top Image
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4 relative">
            <div className="w-full relative flex flex-col gap-3">
              <div className="flex justify-between items-center relative">
                <h4 className="text-sm font-medium text-gray-600">Front</h4>
                {uploadedImageUrl ? (
                  <div className="relative">
                    <button
                      ref={topFrontDotsRef}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdown(openDropdown === "top-front" ? null : "top-front");
                      }}
                      className="p-1 rounded hover:bg-gray-100"
                      aria-label="Options"
                    >
                      <Image src="/assets/dots.svg" alt="options" width={18} height={18} className="relative" />
                    </button>
                    <ImageSlotMenu
                      open={openDropdown === "top-front"}
                      onClose={() => setOpenDropdown(null)}
                      anchorRef={topFrontDotsRef}
                      onSwap={handleTopFrontSwap}
                      onRemove={handleTopFrontRemove}
                    />
                  </div>
                ) : null}
              </div>
              <DropZone
                imageUrl={uploadedImageUrl}
                onFile={handleTopFrontFile}
                placeholderSrc="/assets/front-upload.png"
                placeholderAlt="Top front"
                title="Upload Top Front View"
                hint="Drop or click to add image (PNG, JPG, WebP, AVIF, HEIC)"
              />
            </div>
            <div className="w-full relative flex flex-col gap-3">
              <div className="flex justify-between items-center relative">
                <h4 className="text-sm font-medium text-gray-600">Back</h4>
                {topBackUrl ? (
                  <div className="relative">
                    <button
                      ref={topBackDotsRef}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdown(openDropdown === "top-back" ? null : "top-back");
                      }}
                      className="p-1 rounded hover:bg-gray-100"
                      aria-label="Options"
                    >
                      <Image src="/assets/dots.svg" alt="options" width={18} height={18} className="relative" />
                    </button>
                    <ImageSlotMenu
                      open={openDropdown === "top-back"}
                      onClose={() => setOpenDropdown(null)}
                      anchorRef={topBackDotsRef}
                      onSwap={handleTopBackSwap}
                      onRemove={handleTopBackRemove}
                    />
                  </div>
                ) : null}
              </div>
              <DropZone
                imageUrl={topBackUrl}
                onFile={handleTopBackFile}
                placeholderSrc="/assets/front-upload.png"
                placeholderAlt="Top back"
                title="Upload Top Back View"
                hint="Drop or click to add image (PNG, JPG, WebP, AVIF, HEIC)"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className={`relative w-full ${selectedOption === "Bottom" ? "block" : "hidden"}`}>
        <div className="rounded-xl w-full relative overflow-hidden border border-gray-200 bg-white">
          <div className="flex justify-between items-center relative p-4 border-b border-gray-200">
            <h4 className="text-base leading-[120%] text-black-600 font-semibold">Bottom</h4>
            <button
              type="button"
              onClick={clearAllBottom}
              className="text-sm text-gray-600 font-medium leading-[140%] flex gap-1 hover:text-black-600"
            >
              <Image src="/assets/bin.svg" alt="bin" width={16} height={16} />
              Clear All Bottom Image
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4 relative">
            <div className="w-full relative flex flex-col gap-3">
              <div className="flex justify-between items-center relative">
                <h4 className="text-sm font-medium text-gray-600">Front</h4>
                {bottomFrontUrl ? (
                  <div className="relative">
                    <button
                      ref={bottomFrontDotsRef}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdown(openDropdown === "bottom-front" ? null : "bottom-front");
                      }}
                      className="p-1 rounded hover:bg-gray-100"
                      aria-label="Options"
                    >
                      <Image src="/assets/dots.svg" alt="options" width={18} height={18} className="relative" />
                    </button>
                    <ImageSlotMenu
                      open={openDropdown === "bottom-front"}
                      onClose={() => setOpenDropdown(null)}
                      anchorRef={bottomFrontDotsRef}
                      onSwap={handleBottomFrontSwap}
                      onRemove={handleBottomFrontRemove}
                    />
                  </div>
                ) : null}
              </div>
              <DropZone
                imageUrl={bottomFrontUrl}
                onFile={handleBottomFrontFile}
                placeholderSrc="/assets/bottom-front.png"
                placeholderAlt="Bottom front"
                title="Upload Bottom Front View"
                hint="Drop or click to add image (PNG, JPG, WebP, AVIF, HEIC)"
              />
            </div>
            <div className="w-full relative flex flex-col gap-3">
              <div className="flex justify-between items-center relative">
                <h4 className="text-sm font-medium text-gray-600">Back</h4>
                {bottomBackUrl ? (
                  <div className="relative">
                    <button
                      ref={bottomBackDotsRef}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdown(openDropdown === "bottom-back" ? null : "bottom-back");
                      }}
                      className="p-1 rounded hover:bg-gray-100"
                      aria-label="Options"
                    >
                      <Image src="/assets/dots.svg" alt="options" width={18} height={18} className="relative" />
                    </button>
                    <ImageSlotMenu
                      open={openDropdown === "bottom-back"}
                      onClose={() => setOpenDropdown(null)}
                      anchorRef={bottomBackDotsRef}
                      onSwap={handleBottomBackSwap}
                      onRemove={handleBottomBackRemove}
                    />
                  </div>
                ) : null}
              </div>
              <DropZone
                imageUrl={bottomBackUrl}
                onFile={handleBottomBackFile}
                placeholderSrc="/assets/bottom-back.png"
                placeholderAlt="Bottom back"
                title="Upload Bottom Back View"
                hint="Drop or click to add image (PNG, JPG, WebP, AVIF, HEIC)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
