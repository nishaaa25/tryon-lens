"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import { womenModels, menModels } from "@/lib/data";

type DataModel = (typeof womenModels)[number];

function formatAgeGroup(age: string): string {
  const map: Record<string, string> = {
    young_adult: "18–25 yrs",
    adult: "26–35 yrs",
    mature: "36–45 yrs",
  };
  return map[age] ?? age;
}

function formatLabel(m: DataModel): string {
  const ethnicity =
    String(m.ethnicity).charAt(0).toUpperCase() + String(m.ethnicity).slice(1);
  const body =
    String(m["body-type"]).charAt(0).toUpperCase() +
    String(m["body-type"]).slice(1);
  return `${body} (${ethnicity})`;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

type FilterState = {
  ethnicity: string[];
  bodyType: string[];
  ageGroup: string[];
};

const emptyFilters: FilterState = { ethnicity: [], bodyType: [], ageGroup: [] };

type TabId = "men" | "women" | "boy" | "girl";

const TAB_CONFIG: { id: TabId; label: string }[] = [
  { id: "women", label: "Women" },
  { id: "men", label: "Men" },
  { id: "girl", label: "Girl" },
  { id: "boy", label: "Boy" },
];

function getModelsForTab(tab: TabId): DataModel[] {
  if (tab === "women") return womenModels;
  if (tab === "girl") return [];
  if (tab === "men") return menModels;
  return [];
}

type ModelsGalleryProps = {
  selectedModelIds: Set<string>;
  setSelectedModelIds: React.Dispatch<React.SetStateAction<Set<string>>>;
};

export default function ModelsGallery({
  selectedModelIds,
  setSelectedModelIds,
}: ModelsGalleryProps) {
  const [activeTab, setActiveTab] = useState<TabId>("women");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filtersWomen, setFiltersWomen] = useState<FilterState>(emptyFilters);
  const [filtersGirl, setFiltersGirl] = useState<FilterState>(emptyFilters);
  const [filtersMen, setFiltersMen] = useState<FilterState>(emptyFilters);
  const [filtersBoy, setFiltersBoy] = useState<FilterState>(emptyFilters);
  const [previewModelId, setPreviewModelId] = useState<string | null>(null);

  const currentModels = useMemo(() => getModelsForTab(activeTab), [activeTab]);
  const currentFilters =
    activeTab === "women"
      ? filtersWomen
      : activeTab === "girl"
        ? filtersGirl
        : activeTab === "men"
          ? filtersMen
          : filtersBoy;
  const setCurrentFilters =
    activeTab === "women"
      ? setFiltersWomen
      : activeTab === "girl"
        ? setFiltersGirl
        : activeTab === "men"
          ? setFiltersMen
          : setFiltersBoy;
  const allModels = useMemo(() => [...womenModels, ...menModels], []);

  const setActiveTabAndClearOther = (tab: TabId) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    const tabModels = getModelsForTab(tab);
    const keepSet = new Set(tabModels.map((m) => m.id));
    setSelectedModelIds(
      (prev) => new Set(Array.from(prev).filter((id) => keepSet.has(id))),
    );
  };

  const filterOptions = useMemo(() => {
    const ethnicities = new Set<string>();
    const bodyTypes = new Set<string>();
    const ageGroups = new Set<string>();
    currentModels.forEach((m) => {
      ethnicities.add(String(m.ethnicity));
      bodyTypes.add(String(m["body-type"]));
      ageGroups.add(String(m["age-group"]));
    });
    return {
      ethnicity: Array.from(ethnicities).sort(),
      bodyType: Array.from(bodyTypes).sort(),
      ageGroup: Array.from(ageGroups).sort(),
    };
  }, [currentModels]);

  const filteredModels = useMemo(() => {
    const { ethnicity, bodyType, ageGroup } = currentFilters;
    return currentModels.filter((m) => {
      if (ethnicity.length > 0 && !ethnicity.includes(String(m.ethnicity)))
        return false;
      if (bodyType.length > 0 && !bodyType.includes(String(m["body-type"])))
        return false;
      if (ageGroup.length > 0 && !ageGroup.includes(String(m["age-group"])))
        return false;
      return true;
    });
  }, [currentModels, currentFilters]);

  const selectedIdsInOrder = useMemo(
    () => Array.from(selectedModelIds),
    [selectedModelIds],
  );
  const selectedModelsForSlots = useMemo(
    () =>
      selectedIdsInOrder
        .map((id) => allModels.find((m) => m.id === id))
        .filter(Boolean) as DataModel[],
    [selectedIdsInOrder, allModels],
  );

  const toggleModelSelection = (modelId: string) => {
    setSelectedModelIds((prev) => {
      if (prev.has(modelId)) return new Set<string>();
      return new Set([modelId]);
    });
  };

  const selectedChips = useMemo(() => {
    const chips: string[] = [];
    const { ethnicity, bodyType, ageGroup } = currentFilters;
    ethnicity.forEach((e) => chips.push(capitalize(e)));
    bodyType.forEach((b) => chips.push(capitalize(b)));
    ageGroup.forEach((a) => chips.push(formatAgeGroup(a)));
    return chips;
  }, [currentFilters]);

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
    const { ethnicity, bodyType, ageGroup } = currentFilters;
    const eth = filterOptions.ethnicity.find((e) => capitalize(e) === chip);
    if (eth !== undefined)
      return setCurrentFilters({
        ...currentFilters,
        ethnicity: ethnicity.filter((v) => v !== eth),
      });
    const body = filterOptions.bodyType.find((b) => capitalize(b) === chip);
    if (body !== undefined)
      return setCurrentFilters({
        ...currentFilters,
        bodyType: bodyType.filter((v) => v !== body),
      });
    const age = filterOptions.ageGroup.find((a) => formatAgeGroup(a) === chip);
    if (age !== undefined)
      return setCurrentFilters({
        ...currentFilters,
        ageGroup: ageGroup.filter((v) => v !== age),
      });
  };

  const resetFilters = () => {
    setCurrentFilters(emptyFilters);
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
              Select one model
            </p>
          </div>
          <div className="flex items-center gap-2">
            {[0].map((idx) => {
              const model = selectedModelsForSlots[idx];
              return (
                <div
                  key={idx}
                  className="h-12 w-12 rounded-md border border-border overflow-hidden relative bg-surface-muted flex-shrink-0"
                >
                  {model ? (
                    <Image
                      src={model.frontImage}
                      alt={formatLabel(model)}
                      fill
                      className="object-cover"
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tabs: Women, Girl, Men, Boy */}
        <div className="relative flex flex-wrap justify-between items-center gap-2">
          <div className="inline-flex flex-wrap rounded-lg bg-surface-muted p-1 text-sm leading-[120%] border border-border font-medium gap-1">
            {TAB_CONFIG.map(({ id, label }) => {
              const count = getModelsForTab(id).length;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTabAndClearOther(id)}
                  className={`min-w-0 flex-1 sm:flex-none py-1.5 rounded-md text-black-600 px-2 sm:px-3 ${activeTab === id ? "border border-surface bg-surface" : ""}`}
                >
                  {label}
                  <span className="text-orange-600 font-semibold rounded-full leading-[140%] text-sm ml-1 px-1 bg-surface-tint">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsFiltersOpen(true)}
              className="inline-flex items-center gap-2 rounded-md border border-border font-medium bg-surface px-3 py-[10px] text-sm leading-[120%] text-black-600  hover:bg-gray-50"
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
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {filteredModels.map((model) => {
              const isSelected = selectedModelIds.has(model.id);
              const label = formatLabel(model);
              return (
                <div
                  key={model.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleModelSelection(model.id)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && toggleModelSelection(model.id)
                  }
                  className={`rounded-xl border overflow-hidden flex flex-col transition-all cursor-pointer ${
                    isSelected
                      ? "border-orange-300 bg-surface-tint"
                      : "border-border bg-surface"
                  }`}
                >
                  <div
                    className={`px-4 py-3.5 flex items-center justify-between border-b ${isSelected ? "border-orange-300" : "border-border"}`}
                  >
                    <p className="text-sm font-medium text-black-600 leading-[120%]">
                      {label}
                    </p>
                    <Image
                      src="/assets/like.svg"
                      width={16}
                      height={16}
                      alt="like icon"
                      className="hidden"
                    />
                  </div>
                  <div className="relative p-4 flex justify-center items-center">
                    <div
                      className={`rounded-xl w-full p-1.5 relative h-[12rem] overflow-hidden border ${isSelected ? "border-orange-600" : "border-border"} bg-surface`}
                    >
                      <Image
                        src={model.frontImage}
                        alt={label}
                        fill
                        className="w-full h-full absolute top-0 left-0 object-cover"
                      />
                      <div className="flex justify-between items-start relative">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewModelId(model.id);
                          }}
                          className="relative inline-flex items-center cursor-pointer gap-1 rounded-full bg-surface border border-border px-2 py-1 text-[10px] leading-[120%] text-gray-600"
                        >
                          <Image
                            src="/assets/preview-eye.svg"
                            alt="preview eye"
                            width={13}
                            height={13}
                          />
                          <span>Preview</span>
                        </button>
                        {isSelected && (
                          <Image
                            src="/assets/selected.svg"
                            alt="selected badge"
                            width={16}
                            height={16}
                          />
                        )}
                      </div>
                      <div
                        role="presentation"
                        className="absolute bottom-1.5 right-1.5 inline-flex items-center justify-center gap-1 rounded-full bg-surface border border-border px-2 py-1 text-[10px] leading-[120%] text-gray-600 pointer-events-none"
                      >
                        <span>{formatAgeGroup(model["age-group"])}</span>
                        <div className="w-[1px] h-2 bg-gray-200 mt-[2px]" />
                        <span>{String(model["body-type"])}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters Modal */}
      {isFiltersOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg mx-4 bg-surface rounded-2xl  border border-border overflow-hidden">
            {/* Modal header */}
            <div className="px-4 py-[14px] flex items-center justify-between border-b border-border">
              <h3 className="text-xl leading-[120%] font-semibold text-black-600">
                Filters
              </h3>
              <button
                type="button"
                onClick={() => setIsFiltersOpen(false)}
                className="relative"
                aria-label="Close filters"
              >
                <Image
                  src="/assets/cross.svg"
                  alt="close-btn"
                  width={24}
                  height={24}
                />
              </button>
            </div>

            <div className="p-4 max-h-[70vh] flex flex-col gap-6 leading-[120%] overflow-y-auto ">
              {/* Selected */}
              <div className="relative flex flex-col gap-3">
                <p className="text-base font-semibold text-black-600 ">
                  Selected
                </p>
                <div className="flex flex-wrap gap-2 ">
                  {selectedChips.length === 0 ? (
                    <span className="text-xs text-gray-500">None</span>
                  ) : (
                    selectedChips.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => removeChip(chip)}
                        className="inline-flex items-center gap-2 rounded-full border border-black-600 px-2.5 py-1.5 text-sm font-medium text-black-600"
                      >
                        <span>{chip}</span>
                        <Image
                          src="/assets/remove.svg"
                          alt="remove-filter"
                          width={16}
                          height={16}
                        />
                      </button>
                    ))
                  )}
                </div>
              </div>

              <hr className="h-px w-full relative text-gray-200" />

              {/* Ethnicity – from data */}
              <div className="relative flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold text-black-600">
                    Ethnicity
                  </p>
                  <span className="text-gray-500">⌃</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm leading-[120%]">
                  {filterOptions.ethnicity.map((value) => (
                    <label key={value} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={currentFilters.ethnicity.includes(value)}
                        onChange={() =>
                          toggleInList(
                            value,
                            currentFilters.ethnicity,
                            (next) =>
                              setCurrentFilters({
                                ...currentFilters,
                                ethnicity: next,
                              }),
                          )
                        }
                        className="h-5 w-5 accent-orange-500"
                      />
                      <span
                        className={
                          currentFilters.ethnicity.includes(value)
                            ? "text-black-600 font-medium"
                            : "text-gray-600 font-normal"
                        }
                      >
                        {capitalize(value)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="h-px w-full relative text-gray-200" />

              {/* Body type – from data */}
              <div className="relative flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold text-black-600">
                    Body type
                  </p>
                  <span className="text-gray-500">⌃</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm leading-[120%]">
                  {filterOptions.bodyType.map((value) => (
                    <label key={value} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={currentFilters.bodyType.includes(value)}
                        onChange={() =>
                          toggleInList(value, currentFilters.bodyType, (next) =>
                            setCurrentFilters({
                              ...currentFilters,
                              bodyType: next,
                            }),
                          )
                        }
                        className="h-5 w-5 accent-orange-500"
                      />
                      <span
                        className={
                          currentFilters.bodyType.includes(value)
                            ? "text-black-600 font-medium"
                            : "text-gray-600 font-normal"
                        }
                      >
                        {capitalize(value)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="h-px w-full relative text-gray-200" />

              {/* Age – from data */}
              <div className="relative flex flex-col gap-3 pb-3">
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold text-black-600">Age</p>
                  <span className="text-gray-500">⌃</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm leading-[120%]">
                  {filterOptions.ageGroup.map((value) => (
                    <label key={value} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={currentFilters.ageGroup.includes(value)}
                        onChange={() =>
                          toggleInList(value, currentFilters.ageGroup, (next) =>
                            setCurrentFilters({
                              ...currentFilters,
                              ageGroup: next,
                            }),
                          )
                        }
                        className="h-5 w-5 accent-orange-500"
                      />
                      <span
                        className={
                          currentFilters.ageGroup.includes(value)
                            ? "text-black-600 font-medium"
                            : "text-gray-600 font-normal"
                        }
                      >
                        {formatAgeGroup(value)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="px-6 py-3 border-t border-border flex items-center justify-between bg-surface relative">
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center rounded-lg border border-gray-300 bg-surface px-4 py-2 text-sm text-gray-800 hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsFiltersOpen(false)}
                className="inline-flex items-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-900"
              >
                Show {filteredModels.length} Model
                {filteredModels.length !== 1 ? "s" : ""}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewModelId &&
        (() => {
          const previewModel = [...womenModels, ...menModels].find(
            (m) => m.id === previewModelId,
          );
          const poses = previewModel?.modelPoses?.map((p) => p.imageUrl) ?? [];
          const previewImages = previewModel
            ? [previewModel.frontImage, ...poses.slice(0, 2)]
            : [];
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="w-full max-w-5xl mx-4 bg-surface rounded-2xl border border-border overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {previewModel ? formatLabel(previewModel) : "Model"} Preview
                  </h3>
                  <button
                    type="button"
                    onClick={() => setPreviewModelId(null)}
                    className="flex items-center justify-center relative cursor-pointer"
                    aria-label="Close preview"
                  >
                    <Image
                      src="/assets/cross.svg"
                      alt="close icon"
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
                <div className="p-4 relative">
                  <div className="grid relative grid-cols-1 md:grid-cols-3 gap-4">
                    {previewImages.map((src, idx) => (
                      <div
                        key={idx}
                        className="aspect-[2/3] relative bg-gray-50 rounded-xl overflow-hidden"
                      >
                        <Image
                          src={src}
                          alt="Model preview"
                          className="w-full h-full object-cover rounded-lg"
                          fill
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
    </>
  );
}
