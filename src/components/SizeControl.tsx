import { PRESET_SIZES } from "@/lib/utils";

interface SizeControlProps {
  width: number;
  height: number;
  onChange: (width: number, height: number) => void;
}

export default function SizeControl({ width, height, onChange }: SizeControlProps) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Dimensions
      </label>
      
      {/* Manual Input */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Width (px)</label>
          <input
            type="number"
            value={width}
            onChange={(e) => onChange(parseInt(e.target.value) || 0, height)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px]"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Height (px)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => onChange(width, parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px]"
          />
        </div>
      </div>

      {/* Preset Sizes */}
      <div>
        <span className="text-xs text-gray-500 dark:text-gray-400 mb-2 block">Presets</span>
        <div className="flex flex-wrap gap-2">
          {PRESET_SIZES.map((size) => (
            <button
              key={size.label}
              onClick={() => onChange(size.width, size.height)}
              className="px-3 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors min-h-[44px]"
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
