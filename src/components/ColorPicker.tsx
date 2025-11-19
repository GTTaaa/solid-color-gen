import { MORANDI_COLORS, getRandomHex } from "@/lib/utils";
import { Shuffle, Copy, Check } from "lucide-react";
import { useState } from "react";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Color Selection
        </label>
        <button
          onClick={() => onChange(getRandomHex())}
          className="text-xs flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
        >
          <Shuffle className="w-3 h-3" />
          Randomize
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {/* Input and Color Picker */}
        <div className="flex gap-2">
          <div className="relative flex-1 group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-mono">#</span>
            <input
              type="text"
              value={color.replace('#', '')}
              onChange={(e) => {
                const val = e.target.value;
                if (/^[0-9A-Fa-f]{0,6}$/.test(val)) {
                  onChange(`#${val}`);
                }
              }}
              className="w-full pl-7 pr-10 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono uppercase"
              placeholder="Hex Code"
            />
            <button
              onClick={handleCopy}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Copy Hex Code"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="relative w-[44px] h-[44px] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm shrink-0">
             <input
              type="color"
              value={color.length === 7 ? color : '#000000'}
              onChange={(e) => onChange(e.target.value)}
              className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] p-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Presets */}
        <div>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 block">Curated Colors</span>
          <div className="grid grid-cols-8 gap-2">
            {MORANDI_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => onChange(c)}
                className="aspect-square rounded-lg border border-black/5 dark:border-white/10 hover:scale-110 hover:z-10 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 relative group"
                style={{ backgroundColor: c }}
                aria-label={`Select color ${c}`}
              >
                {color.toLowerCase() === c.toLowerCase() && (
                   <span className="absolute inset-0 flex items-center justify-center">
                     <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm" />
                   </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
