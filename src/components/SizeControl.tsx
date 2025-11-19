import { PRESET_SIZES } from "@/lib/utils";
import { Smartphone, Instagram, Monitor } from "lucide-react";

interface SizeControlProps {
  width: number;
  height: number;
  onChange: (width: number, height: number) => void;
}

export default function SizeControl({ width, height, onChange }: SizeControlProps) {
  return (
    <div className="space-y-6">
      <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
        Dimensions
      </label>
      
      {/* Manual Input */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Width</label>
          <div className="relative">
            <input
              type="number"
              value={width}
              onChange={(e) => onChange(parseInt(e.target.value) || 0, height)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-gray-700 dark:text-gray-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium pointer-events-none">px</span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Height</label>
          <div className="relative">
            <input
              type="number"
              value={height}
              onChange={(e) => onChange(width, parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-gray-700 dark:text-gray-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium pointer-events-none">px</span>
          </div>
        </div>
      </div>

      {/* Preset Sizes */}
      <div>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 block uppercase tracking-wider">Quick Presets</span>
        <div className="flex flex-wrap gap-2">
          {PRESET_SIZES.map((size) => {
            const isActive = width === size.width && height === size.height;
            return (
              <button
                key={size.label}
                onClick={() => onChange(size.width, size.height)}
                className={`
                  px-4 py-2.5 text-sm rounded-xl font-medium transition-all duration-200 flex items-center gap-2 border
                  ${isActive 
                    ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400 shadow-sm' 
                    : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100 hover:border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700'
                  }
                `}
              >
                {/* Simple icon logic based on label keywords */}
                {size.label.toLowerCase().includes('phone') ? <Smartphone className="w-4 h-4" /> :
                 size.label.toLowerCase().includes('instagram') ? <Instagram className="w-4 h-4" /> :
                 <Monitor className="w-4 h-4" />}
                {size.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
