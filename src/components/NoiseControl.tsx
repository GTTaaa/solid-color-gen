import { Sparkles } from "lucide-react";

interface NoiseControlProps {
  value: number;
  onChange: (value: number) => void;
}

export default function NoiseControl({ value, onChange }: NoiseControlProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide uppercase flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Texture Intensity
        </label>
        <span className="text-sm font-mono font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg min-w-[4ch] text-center">
          {value}%
        </span>
      </div>
      
      <div className="relative h-10 flex items-center group">
        <input
          type="range"
          min="0"
          max="50"
          step="1"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full appearance-none cursor-pointer accent-gray-900 dark:accent-white focus:outline-none focus:ring-2 focus:ring-gray-500/20 relative z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-gray-200 [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
        />
      </div>
    </div>
  );
}
