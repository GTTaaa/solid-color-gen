import { Sparkles } from "lucide-react";

interface NoiseControlProps {
  value: number;
  onChange: (value: number) => void;
}

export default function NoiseControl({ value, onChange }: NoiseControlProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
          <Sparkles className="w-4 h-4 text-blue-500" />
          Texture / Noise
        </label>
        <span className="text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md min-w-[3ch] text-center">
          {value}%
        </span>
      </div>
      
      <div className="relative h-6 flex items-center group">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-400 dark:from-gray-800 dark:to-gray-600 rounded-lg opacity-20 group-hover:opacity-30 transition-opacity" />
        <input
          type="range"
          min="0"
          max="50"
          step="1"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 relative z-10"
        />
      </div>
    </div>
  );
}
