import { PRESET_SIZES } from "@/lib/utils";
import { Smartphone, Instagram, Monitor } from "lucide-react";

interface SizeControlProps {
  width: number;
  height: number;
  onChange: (width: number, height: number) => void;
}

export default function SizeControl({ width, height, onChange }: SizeControlProps) {
  return (
    <div className="space-y-5 lg:space-y-7">
      <label className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide uppercase">
        Dimensions
      </label>
      
      {/* Manual Input */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Width</label>
          <div className="relative group">
            <input
              type="number"
              value={width}
              onChange={(e) => onChange(parseInt(e.target.value) || 0, height)}
              className="w-full px-4 py-3 lg:py-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800/50 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-black/5 dark:focus:ring-white/10 focus:border-gray-300 dark:focus:border-gray-600 transition-all font-mono text-lg font-medium text-gray-900 dark:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium pointer-events-none group-hover:text-gray-600 transition-colors">px</span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Height</label>
          <div className="relative group">
            <input
              type="number"
              value={height}
              onChange={(e) => onChange(width, parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 lg:py-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800/50 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-black/5 dark:focus:ring-white/10 focus:border-gray-300 dark:focus:border-gray-600 transition-all font-mono text-lg font-medium text-gray-900 dark:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium pointer-events-none group-hover:text-gray-600 transition-colors">px</span>
          </div>
        </div>
      </div>

      {/* Preset Sizes */}
      <div>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 block uppercase tracking-wider ml-1">Quick Presets</span>
        <div className="flex flex-wrap gap-2.5">
          {PRESET_SIZES.map((size) => {
            const isActive = width === size.width && height === size.height;
            return (
              <button
                key={size.label}
                onClick={() => onChange(size.width, size.height)}
                className={`
                  px-4 py-3 text-sm rounded-xl font-medium transition-all duration-200 flex items-center gap-2.5 border relative overflow-hidden group
                  ${isActive 
                    ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-black dark:border-white shadow-md' 
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:border-gray-600'
                  }
                `}
              >
                {/* Simple icon logic based on label keywords */}
                {size.label.toLowerCase().includes('phone') ? <Smartphone className={`w-4 h-4 ${isActive ? 'opacity-100' : 'opacity-70'}`} /> :
                 size.label.toLowerCase().includes('instagram') ? <Instagram className={`w-4 h-4 ${isActive ? 'opacity-100' : 'opacity-70'}`} /> :
                 <Monitor className={`w-4 h-4 ${isActive ? 'opacity-100' : 'opacity-70'}`} />}
                <span>{size.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
