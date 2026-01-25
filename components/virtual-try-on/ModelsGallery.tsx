"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";

type ModelCard = {
  id: number;
  name: string;
  subtitle: string;
  ageRange: string;
  size: string;
  imageUrl: string;
  featured?: boolean;
  previewImages: string[];
};

const mockModels: ModelCard[] = [
  {
    id: 1,
    name: "Denise (Caucasian)",
    subtitle: "Women",
    ageRange: "26–35 yrs",
    size: "S-M",
    imageUrl:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    featured: true,
    previewImages: [
      "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=900",
    ],
  },
  {
    id: 2,
    name: "Naomi (Black)",
    subtitle: "Women",
    ageRange: "26–35 yrs",
    size: "L-XL",
    imageUrl:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600",
    previewImages: [
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/936116/pexels-photo-936116.jpeg?auto=compress&cs=tinysrgb&w=900",
    ],
  },
  {
    id: 3,
    name: "Devon (Latino)",
    subtitle: "Women",
    ageRange: "18–25 yrs",
    size: "S-M",
    imageUrl:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600",
    previewImages: [
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/3760852/pexels-photo-3760852.jpeg?auto=compress&cs=tinysrgb&w=900",
    ],
  },
  {
    id: 4,
    name: "Julie (East Asian)",
    subtitle: "Women",
    ageRange: "46–55 yrs",
    size: "M-L",
    imageUrl:
      "https://images.pexels.com/photos/3760852/pexels-photo-3760852.jpeg?auto=compress&cs=tinysrgb&w=600",
    previewImages: [
      "https://images.pexels.com/photos/3760852/pexels-photo-3760852.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=900",
    ],
  },
  {
    id: 5,
    name: "Riva (South Asian)",
    subtitle: "Women",
    ageRange: "26–35 yrs",
    size: "S-M",
    imageUrl:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    previewImages: [
      "https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=900",
    ],
  },
  {
    id: 6,
    name: "Riva (South Asian)",
    subtitle: "Women",
    ageRange: "26–35 yrs",
    size: "S-M",
    imageUrl:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    previewImages: [
      "https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=900",
    ],
  },
  {
    id: 7,
    name: "Riva (South Asian)",
    subtitle: "Women",
    ageRange: "26–35 yrs",
    size: "S-M",
    imageUrl:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    previewImages: [
      "https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=900",
    ],
  },
  {
    id: 8,
    name: "Riva (South Asian)",
    subtitle: "Women",
    ageRange: "26–35 yrs",
    size: "S-M",
    imageUrl:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    previewImages: [
      "https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=900",
    ],
  },
  {
    id: 9,
    name: "Riva (South Asian)",
    subtitle: "Women",
    ageRange: "26–35 yrs",
    size: "S-M",
    imageUrl:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    previewImages: [
      "https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=900",
    ],
  },
  {
    id: 10,
    name: "Riva (South Asian)",
    subtitle: "Women",
    ageRange: "26–35 yrs",
    size: "S-M",
    imageUrl:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    previewImages: [
      "https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=900",
    ],
  },
];

export default function ModelsGallery() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [ethnicity, setEthnicity] = useState<string[]>(["Caucasian"]);
  const [hairColor, setHairColor] = useState<string>("Blonde");
  const [bodySize, setBodySize] = useState<string[]>(["Small (S)"]);
  const [age, setAge] = useState<string[]>(["26–35 yrs"]);
  const [previewModelId, setPreviewModelId] = useState<number | null>(null);

  const selectedChips = useMemo(() => {
    const chips: string[] = [];
    chips.push(...ethnicity);
    if (hairColor) chips.push(hairColor);
    chips.push(...bodySize);
    chips.push(...age);
    return chips;
  }, [age, bodySize, ethnicity, hairColor]);

  const toggleInList = (
    value: string,
    list: string[],
    setter: (next: string[]) => void,
  ) => {
    if (list.includes(value)) {
      setter(list.filter((v) => v !== value));
      return;
    }
    setter([...list, value]);
  };

  const removeChip = (chip: string) => {
    if (ethnicity.includes(chip))
      return setEthnicity(ethnicity.filter((v) => v !== chip));
    if (bodySize.includes(chip))
      return setBodySize(bodySize.filter((v) => v !== chip));
    if (age.includes(chip)) return setAge(age.filter((v) => v !== chip));
    if (hairColor === chip) return setHairColor("");
  };

  const resetFilters = () => {
    setEthnicity([]);
    setHairColor("");
    setBodySize([]);
    setAge([]);
  };

  return (
    <>
      <div className="flex flex-col h-full relative overflow-hidden gap-[14px]">
        {/* Header */}
        <div className="relative border-b border-gray-100 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl leading-[120%] font-semibold text-black-600 mb-1">
              Models Gallery
            </h2>
            <p className="text-sm leading-[140%] font-medium text-gray-600 ">
              Select up to 4 models
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-12 w-12 rounded-md border bg-[#f2f5f8] relative border-gray-200 overflow-hidden"></div>
            <div className="h-12 w-12 rounded-md border bg-[#f2f5f8] relative border-gray-200 overflow-hidden"></div>
            <div className="h-12 w-12 rounded-md border bg-[#f2f5f8] relative border-gray-200 overflow-hidden">
              <Image
                src="/assets/dummy-upload.png"
                alt="Model thumbnail"
                fill
                className=" object-cover"
              />
            </div>
            <div className="h-12 w-12 rounded-md border bg-[#f2f5f8] relative border-gray-200 overflow-hidden">
              <Image
                src="/assets/dummy-upload.png"
                alt="Model thumbnail"
                fill
                className=" object-cover"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="relative flex justify-between items-center ">
          <div className="inline-flex rounded-lg bg-[#f2f5f8] p-1 text-sm leading-[120%] border border-gray-200 font-medium">
            <button className="w-[133px] py-1.5 rounded-md border border-white bg-white text-black-600">
              Women
              <span className="text-orange-600 font-semibold rounded-full leading-[140%] text-sm  ml-1 px-1 bg-[#fff3eb]">
                68
              </span>
            </button>
            <button className="w-[133px] py-1.5 rounded-md text-black-600 ">
              Men
              <span className="text-orange-600 font-semibold rounded-full leading-[140%] text-sm  ml-1 px-1 bg-[#fff3eb]">
                15
              </span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-md border border-gray-200 font-medium bg-white px-3 py-[10px] text-sm leading-[120%] text-black-600  hover:bg-gray-50">
              <Image
                src="/assets/like.svg"
                alt="heart icon"
                width={16}
                height={16}
              />
              <span>Favorites</span>
            </button>
            <button
              type="button"
              onClick={() => setIsFiltersOpen(true)}
              className="inline-flex items-center gap-2 rounded-md border border-gray-200 font-medium bg-white px-3 py-[10px] text-sm leading-[120%] text-black-600  hover:bg-gray-50"
            >
              <Image
                src="/assets/filter.svg"
                alt="filter icon"
                width={16}
                height={16}
              />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="relative overflow-y-auto mt-2 no-scrollbar pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {mockModels.map((model) => (
              <div
                key={model.id}
                className={`rounded-xl border overflow-hidden flex flex-col transition-all ${
                  model.featured
                    ? "border-orange-300 bg-[#fff3eb]"
                    : "border-gray-200 bg-white hover:shadow-md"
                }`}
              >
                <div
                  className={`px-4 py-3.5 flex items-center justify-between border-b ${model.featured ? "border-orange-300" : "border-gray-200"} `}
                >
                  <p className="text-sm font-medium text-black-600 leading-[120%]">
                    {model.name}
                  </p>
                  <Image
                    src="/assets/like.svg"
                    width={16}
                    height={16}
                    alt="like icon"
                  />
                </div>
                <div className="relative p-4 flex justify-center items-center">
                  <div
                    className={`rounded-xl w-full p-1.5 relative h-[12rem] overflow-hidden border ${model.featured ? "border-orange-300" : "border-gray-200"} bg-white`}
                  >
                    <Image
                      src="/assets/model.png"
                      alt={model.name}
                      fill
                      className="w-full h-full absolute top-0 left-0 object-cover"
                    />
                    {/* Top chips */}
                    <div className="flex justify-between items-start relative">
                      <button
                        type="button"
                        onClick={() => setPreviewModelId(model.id)}
                        className="relative inline-flex items-center gap-1 rounded-full bg-white border border-gray-200 px-2 py-1 text-[13px] leading-[120%] text-gray-600"
                      >
                        <Image
                          src="/assets/preview-eye.svg"
                          alt="preview eye"
                          width={16}
                          height={16}
                        />
                        <span>Preview</span>
                      </button>
                      {model.featured && (
                        <Image src="/assets/selected.svg" alt="featured badge" width={16} height={16} />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setPreviewModelId(model.id)}
                      className="absolute bottom-1.5 right-1.5 inline-flex items-center justify-center gap-1 rounded-full bg-white border border-gray-200 px-2 py-1 text-[13px] leading-[120%] text-gray-600"
                    >
                      <span>26 - 35 yrs</span>{" "}
                      <div className="w-[1px] h-2 bg-[#e1e4ea] mt-[2px]"></div>{" "}
                      <span>S-M</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters Modal */}
      {isFiltersOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Modal header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              <button
                type="button"
                onClick={() => setIsFiltersOpen(false)}
                className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                aria-label="Close filters"
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-5 max-h-[70vh] overflow-auto">
              {/* Selected */}
              <div className="mb-5">
                <p className="text-sm font-semibold text-gray-900 mb-3">
                  Selected
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedChips.length === 0 ? (
                    <span className="text-xs text-gray-500">None</span>
                  ) : (
                    selectedChips.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => removeChip(chip)}
                        className="inline-flex items-center gap-2 rounded-full border border-gray-800 px-3 py-1 text-xs text-gray-900 hover:bg-gray-50"
                      >
                        <span>{chip}</span>
                        <span className="text-gray-600">×</span>
                      </button>
                    ))
                  )}
                </div>
              </div>

              <div className="h-px bg-gray-200 mb-5" />

              {/* Ethnicity */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-gray-900">
                    Ethnicity
                  </p>
                  <span className="text-gray-500">⌃</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    "Caucasian",
                    "Black",
                    "Latino",
                    "East Asian",
                    "South Asian",
                  ].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={ethnicity.includes(opt)}
                        onChange={() =>
                          toggleInList(opt, ethnicity, setEthnicity)
                        }
                        className="h-4 w-4 accent-orange-500"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-200 mb-5" />

              {/* Hair Color */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-gray-900">
                    Hair Color
                  </p>
                  <span className="text-gray-500">⌃</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: "Blonde", swatch: "bg-amber-200" },
                    { label: "Red", swatch: "bg-orange-600" },
                    { label: "Brown", swatch: "bg-amber-900" },
                    { label: "Black", swatch: "bg-zinc-900" },
                  ].map((opt) => {
                    const active = hairColor === opt.label;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setHairColor(opt.label)}
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs ${
                          active
                            ? "border-gray-900 text-gray-900 bg-white shadow-sm"
                            : "border-gray-200 text-gray-700 bg-white hover:bg-gray-50"
                        }`}
                      >
                        <span
                          className={`h-5 w-5 rounded-full ${opt.swatch}`}
                        />
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="h-px bg-gray-200 mb-5" />

              {/* Body Size */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-gray-900">
                    Body Size
                  </p>
                  <span className="text-gray-500">⌃</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    "Small (S)",
                    "Medium (M)",
                    "Large (L)",
                    "Extra Large (XL)",
                  ].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={bodySize.includes(opt)}
                        onChange={() =>
                          toggleInList(opt, bodySize, setBodySize)
                        }
                        className="h-4 w-4 accent-orange-500"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-200 mb-5" />

              {/* Age */}
              <div className="mb-2">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-gray-900">Age</p>
                  <span className="text-gray-500">⌃</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {["18–25 yrs", "26–35 yrs", "36–45 yrs", "46–55 yrs"].map(
                    (opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <input
                          type="checkbox"
                          checked={age.includes(opt)}
                          onChange={() => toggleInList(opt, age, setAge)}
                          className="h-4 w-4 accent-orange-500"
                        />
                        <span>{opt}</span>
                      </label>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-white">
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsFiltersOpen(false)}
                className="inline-flex items-center rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-black"
              >
                Show 54 Models
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewModelId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-5xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {mockModels.find((m) => m.id === previewModelId)?.name} Preview
              </h3>
              <button
                type="button"
                onClick={() => setPreviewModelId(null)}
                className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                aria-label="Close preview"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {mockModels
                .find((m) => m.id === previewModelId)
                ?.previewImages.map((src, idx) => (
                  <div key={idx} className="aspect-[3/4] bg-gray-50">
                    <img
                      src={src}
                      alt="Model preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
