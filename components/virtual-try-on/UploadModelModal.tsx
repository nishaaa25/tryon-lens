"use client";

import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";

type DataModel = {
    id: string;
    frontImage: string;
    ethnicity: string;
    "body-type": string;
    "age-group": string;
    gender: string;
    modelPoses?: { poseName: string; viewType: string; imageUrl: string }[];
};

type UploadModelModalProps = {
    isOpen: boolean;
    onClose: () => void;
    activeTab: string;
    productType: "Upper body" | "Lower body" | "Full body";
    filterOptions: {
        ageGroup: string[];
        bodyType: string[];
        ethnicity: string[];
    };
    setCustomModels?: React.Dispatch<React.SetStateAction<any[]>>;
    setSelectedModelIds: React.Dispatch<React.SetStateAction<Set<string>>>;
};

// Extracted format helpers for age and capitalize
function formatAgeGroup(age: string): string {
    const map: Record<string, string> = {
        young_adult: "18–25 yrs",
        adult: "26–35 yrs",
        mature: "36–45 yrs",
    };
    return map[age] ?? age;
}

function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

export default function UploadModelModal({
    isOpen,
    onClose,
    activeTab,
    productType,
    filterOptions,
    setCustomModels,
    setSelectedModelIds,
}: UploadModelModalProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [mounted, setMounted] = useState(false);

    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [uploadPreview, setUploadPreview] = useState<string | null>(null);
    const [uploadPoses, setUploadPoses] = useState<{ file: File; url: string }[]>([]);
    const [uploadEthnicity, setUploadEthnicity] = useState("");
    const [uploadBodyType, setUploadBodyType] = useState("");
    const [uploadAgeGroup, setUploadAgeGroup] = useState("");
    const [uploadGender, setUploadGender] = useState("");

    useEffect(() => {
        if (isOpen) {
            setUploadGender(activeTab);
        }
    }, [isOpen, activeTab]);

    useEffect(() => {
        setMounted(true);
    }, []);

    const resetUploadState = (isSubmit = false) => {
        setUploadFile(null);
        setUploadPreview(null);
        if (!isSubmit) {
            uploadPoses.forEach((p) => URL.revokeObjectURL(p.url));
        }
        setUploadPoses([]);
        setUploadEthnicity("");
        setUploadBodyType("");
        setUploadAgeGroup("");
        setUploadGender("");
        onClose();
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadFile(file);
            setUploadPreview(URL.createObjectURL(file));
        }
    };

    const handleUploadSubmit = () => {
        if (!uploadPreview) return;
        const newModel: DataModel = {
            id: `custom-${Date.now()}`,
            frontImage: uploadPreview,
            modelPoses: [
                {
                    poseName: "Front View",
                    viewType:
                        productType === "Upper body"
                            ? "waist-up"
                            : productType === "Lower body"
                                ? "knees"
                                : "full body",
                    imageUrl: uploadPreview,
                },
                ...uploadPoses.map((p, i) => ({
                    poseName: `Custom Pose ${i + 1}`,
                    viewType:
                        productType === "Upper body"
                            ? "waist-up"
                            : productType === "Lower body"
                                ? "knees"
                                : "full body",
                    imageUrl: p.url,
                }))
            ],
            ethnicity: uploadEthnicity || "Custom",
            "body-type": uploadBodyType || "Custom",
            "age-group": uploadAgeGroup || "Custom",
            gender: uploadGender || activeTab,
        } as any;

        setCustomModels?.((prev) => [newModel, ...prev]);
        setSelectedModelIds(new Set([newModel.id]));
        resetUploadState(true);
    };

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="w-full max-w-md bg-surface rounded-2xl border border-border overflow-hidden my-auto flex flex-col max-h-[80vh]">
                <div className="px-5 py-4 flex items-center justify-between border-b border-border shrink-0">
                    <h3 className="text-xl leading-[120%] font-semibold text-black-600">
                        Upload Custom Model
                    </h3>
                    <button
                        type="button"
                        onClick={() => resetUploadState(false)}
                        className="relative p-1 hover:bg-surface-muted rounded"
                        aria-label="Close upload modal"
                    >
                        <Image
                            src="/assets/cross.svg"
                            alt="close-btn"
                            width={20}
                            height={20}
                        />
                    </button>
                </div>

                <div className="p-5 flex flex-col gap-5 overflow-y-auto">
                    {/* Image Upload Area */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-black-600">
                            Model Photo <span className="text-orange-600">*</span>
                        </label>
                        {!uploadPreview ? (
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full aspect-square sm:aspect-video rounded-xl border-2 border-dashed border-border bg-surface-muted flex flex-col items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
                            >
                                <div className="p-3 bg-surface rounded-full shadow-sm border border-border">
                                    <Image
                                        src="/assets/front-upload.png"
                                        alt="Upload"
                                        width={24}
                                        height={24}
                                        className="opacity-70 object-contain"
                                    />
                                </div>
                                <span className="text-sm font-medium text-gray-600">
                                    Click to browse files
                                </span>
                            </button>
                        ) : (
                            <div className="relative w-full aspect-square sm:aspect-video rounded-xl bg-surface-muted overflow-hidden border border-border group">
                                <Image
                                    src={uploadPreview}
                                    alt="Upload preview"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <button
                                        type="button"
                                        onClick={() => setUploadPreview(null)}
                                        className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg shadow-md"
                                    >
                                        Change Image
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Hidden top level input */}
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                        />
                    </div>

                    {/* Additional Poses Area */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-semibold text-black-600">
                                Additional Poses
                            </label>
                            <span className="text-xs text-gray-500 font-medium">
                                {uploadPoses.length}/4
                            </span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {uploadPoses.map((pose, idx) => (
                                <div
                                    key={idx}
                                    className="relative aspect-[3/4] rounded-lg bg-surface-muted border border-border overflow-hidden group"
                                >
                                    <Image
                                        src={pose.url}
                                        alt={`Pose ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            URL.revokeObjectURL(pose.url);
                                            setUploadPoses((prev) =>
                                                prev.filter((_, i) => i !== idx),
                                            );
                                        }}
                                        className="absolute -top-1 -right-1 p-1 bg-surface rounded-full shadow-sm border border-border opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-red-500"
                                    >
                                        <svg
                                            className="w-3 h-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {uploadPoses.length < 4 && (
                                <label className="aspect-[3/4] rounded-lg border border-dashed border-border bg-surface-muted flex flex-col items-center justify-center gap-1 hover:bg-gray-50 transition-colors cursor-pointer relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setUploadPoses((prev) => [
                                                    ...prev,
                                                    { file, url: URL.createObjectURL(file) },
                                                ]);
                                            }
                                            e.target.value = "";
                                        }}
                                    />
                                    <Image
                                        src="/assets/upload.svg"
                                        alt="Upload pose"
                                        width={16}
                                        height={16}
                                        className="opacity-60"
                                    />
                                    <span className="text-[10px] text-gray-500 font-medium">
                                        Add Pose
                                    </span>
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Details Form */}
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-black-600">
                                Gender
                            </label>
                            <div className="relative">
                                <select
                                    value={uploadGender}
                                    onChange={(e) => setUploadGender(e.target.value)}
                                    className="w-full appearance-none rounded-lg border border-border px-3 py-2.5 text-sm text-black-600 bg-surface pr-10 focus:outline-none transition-colors cursor-pointer"
                                >
                                    <option value="">Select gender</option>
                                    <option value="women">Women</option>
                                    <option value="men">Men</option>
                                    <option value="girls">Girls</option>
                                    <option value="boys">Boys</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-black-600">
                                Age Group
                            </label>
                            <div className="relative">
                                <select
                                    value={uploadAgeGroup}
                                    onChange={(e) => setUploadAgeGroup(e.target.value)}
                                    className="w-full appearance-none rounded-lg border border-border px-3 py-2.5 text-sm text-black-600 bg-surface pr-10 focus:outline-none transition-colors cursor-pointer"
                                >
                                    <option value="">Select age group</option>
                                    {filterOptions.ageGroup.map((val) => (
                                        <option key={val} value={val}>
                                            {formatAgeGroup(val)}
                                        </option>
                                    ))}
                                    <option value="Custom">Other (Custom)</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-black-600">
                                Body Type
                            </label>
                            <div className="relative">
                                <select
                                    value={uploadBodyType}
                                    onChange={(e) => setUploadBodyType(e.target.value)}
                                    className="w-full appearance-none rounded-lg border border-border px-3 py-2.5 text-sm text-black-600 bg-surface pr-10 focus:outline-none transition-colors cursor-pointer"
                                >
                                    <option value="">Select body type</option>
                                    {filterOptions.bodyType.map((val) => (
                                        <option key={val} value={val}>
                                            {capitalize(val)}
                                        </option>
                                    ))}
                                    <option value="Custom">Other (Custom)</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-black-600">
                                Ethnicity
                            </label>
                            <div className="relative">
                                <select
                                    value={uploadEthnicity}
                                    onChange={(e) => setUploadEthnicity(e.target.value)}
                                    className="w-full appearance-none rounded-lg border border-border px-3 py-2.5 text-sm text-black-600 bg-surface pr-10 focus:outline-none transition-colors cursor-pointer"
                                >
                                    <option value="">Select ethnicity</option>
                                    {filterOptions.ethnicity.map((val) => (
                                        <option key={val} value={val}>
                                            {capitalize(val)}
                                        </option>
                                    ))}
                                    <option value="Custom">Other (Custom)</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-5 py-4 border-t border-border flex items-center justify-end gap-3 bg-surface shrink-0">
                    <button
                        type="button"
                        onClick={() => resetUploadState(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleUploadSubmit}
                        disabled={
                            !uploadPreview ||
                            !uploadAgeGroup ||
                            !uploadBodyType ||
                            !uploadEthnicity ||
                            !uploadGender
                        }
                        className="px-5 py-2 text-sm font-medium text-white bg-black-600 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Save & Select Model
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );
}
