'use client';

import React from 'react';

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
    name: 'Denise',
    sizes: ['S', 'M'],
    activeSize: 'S',
    imageUrl:
      'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    id: 2,
    name: 'Devon',
    sizes: ['S', 'M'],
    activeSize: 'S',
    imageUrl:
      'https://images.pexels.com/photos/3710855/pexels-photo-3710855.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
];

export default function CustomizeModels() {
  return (
    <div className="flex flex-col h-full rounded-2xl bg-white shadow-sm overflow-hidden">
      {/* Header text */}
      <div className="px-6 pt-5 pb-4">
        <h2 className="text-lg font-semibold text-gray-900">Customize Models</h2>
        <p className="text-sm text-gray-600 mt-1">
          Select a body type for each model
        </p>
      </div>

      {/* Gradient body */}
      <div className="flex-1 rounded-t-2xl bg-linear-to-br from-orange-50 via-amber-50 to-emerald-50 px-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedModels.map((model) => (
            <div
              key={model.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
            >
              <div className="px-5 pt-4 pb-3 border-b border-gray-100">
                <div className="text-sm font-semibold text-gray-900">
                  {model.name}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-600">Size:</span>
                  <div className="inline-flex items-center gap-2">
                    {model.sizes.map((size) => (
                      <span
                        key={size}
                        className={`h-8 w-8 inline-flex items-center justify-center rounded-full border text-sm font-medium ${
                          size === model.activeSize
                            ? 'bg-orange-100 border-orange-400 text-orange-600'
                            : 'bg-white border-gray-300 text-gray-700'
                        }`}
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white">
                <div className="rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
                  <img
                    src={model.imageUrl}
                    alt={model.name}
                    className="w-full h-[320px] object-cover"
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


