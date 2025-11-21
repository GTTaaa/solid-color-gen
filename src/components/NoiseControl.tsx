import { Sparkles } from "lucide-react";

interface NoiseControlProps {
  value: number;
  onChange: (value: number) => void;
}

export default function NoiseControl({ value, onChange }: NoiseControlProps) {
  const isEnabled = value > 0;

  const handleToggle = () => {
    if (isEnabled) {
      onChange(0);
    } else {
      onChange(20); // Default starting value
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide uppercase flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Add Grain/Noise
        </label>
        
        <button
          onClick={handleToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500/20 ${
            isEnabled ? 'bg-gray-900 dark:bg-white' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isEnabled ? 'translate-x-6' : 'translate-x-1'
            } ${isEnabled ? 'dark:bg-black' : ''}`}
          />
        </button>
      </div>
      
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isEnabled ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex items-center justify-between mb-2">
           <span className="text-xs font-medium text-gray-400">Intensity</span>
           <span className="text-xs font-mono font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-center min-w-[3ch]">
            {value}%
          </span>
        </div>
        <div className="relative h-10 flex items-center group">
          <input
            type="range"
            min="1"
            max="50"
            step="1"
            value={value || 20} // Prevent slider jumping to 0 visually when fading out
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full appearance-none cursor-pointer accent-gray-900 dark:accent-white focus:outline-none focus:ring-2 focus:ring-gray-500/20 relative z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-gray-200 [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
}
