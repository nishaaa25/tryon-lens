"use client";

import Image from "next/image";
import React from "react";

type CustomModel = {
  id: number;
  name: string;
  sizes: string[];
  activeSize: string;
  imageUrl: string;
};

const selectedModels: CustomModel[] = [
  {
    id: 1,
    name: "Denise",
    sizes: ["S", "M"],
    activeSize: "S",
    imageUrl:
      "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    id: 2,
    name: "Devon",
    sizes: ["S", "M"],
    activeSize: "S",
    imageUrl:
      "https://images.pexels.com/photos/3710855/pexels-photo-3710855.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
];

export default function CustomizeModels() {
  return (
    <div className="flex flex-col h-full relative overflow-hidden gap-5">
      {/* Header text */}
      <div className="relative flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl leading-[120%] font-semibold text-black-600 mb-1">
            Customize Models
          </h2>
          <p className="text-sm leading-[140%] font-medium text-gray-600 ">
            Select a body type for each model
          </p>
        </div>
      </div>

      {/* Gradient body */}
      <div className="flex-1 rounded-t-2xl pb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {selectedModels.map((model) => (
            <div
              key={model.id}
              className="bg-surface border border-border rounded-xl overflow-hidden"
            >
              <div className="">
                <div className="text-sm p-4 font-semibold text-gray-900 border-b border-border">
                  {model.name}
                </div>
              </div>
              <div className="p-4 bg-surface flex flex-col gap-3 relative">
                <div className="flex items-center gap-2 ">
                  <span className="text-sm leading-[120%] font-medium text-black-600">Size:</span>
                  <div className="inline-flex items-center gap-1">
                    {model.sizes.map((size) => (
                      <span
                        key={size}
                        className={`h-8 w-8 inline-flex items-center justify-center rounded-full border text-base leading-[120%] ${
                          size === model.activeSize
                            ? "bg-orange-600 border-orange-600 text-white font-semibold"
                            : "bg-surface border-border text-gray-600 font-normal"
                        }`}
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl relative h-[20rem] overflow-hidden border border-border ">
                  <Image
                    src="/assets/model.png"
                    alt={model.name}
                    className="w-full h-[320px] object-cover"
                    fill 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
