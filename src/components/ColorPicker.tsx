import { MORANDI_COLORS, getRandomHex } from "@/lib/utils";
import { Shuffle, Copy, Check, Pipette } from "lucide-react";
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
          Color
        </label>
        <button
          onClick={() => onChange(getRandomHex())}
          className="text-xs font-medium flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
        >
          <Shuffle className="w-3.5 h-3.5" />
          Randomize
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {/* Input and Color Picker */}
        <div className="flex gap-3">
          <div className="relative flex-1 group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-gray-200 shadow-sm" style={{ backgroundColor: color }} />
            <input
              type="text"
              value={color.toUpperCase()}
              onChange={(e) => {
                const val = e.target.value.replace('#', '');
                if (/^[0-9A-Fa-f]{0,6}$/.test(val)) {
                  onChange(`#${val}`);
                }
              }}
              className="w-full pl-10 pr-10 py-3 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-lg uppercase tracking-wider text-gray-700 dark:text-gray-200"
              placeholder="#000000"
            />
            <button
              onClick={handleCopy}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Copy Hex Code"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          
          <div className="relative shrink-0">
             <input
              type="color"
              value={color.length === 7 ? color : '#000000'}
              onChange={(e) => onChange(e.target.value)}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
            />
            <div className="w-[52px] h-[52px] rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm hover:border-blue-500 transition-colors">
               <Pipette className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Presets */}
        <div>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 block uppercase tracking-wider">Curated Palette</span>
          <div className="grid grid-cols-6 sm:grid-cols-8 gap-3">
            {MORANDI_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => onChange(c)}
                className="aspect-square rounded-full border border-black/5 dark:border-white/10 hover:scale-110 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative group"
                style={{ backgroundColor: c }}
                aria-label={`Select color ${c}`}
              >
                {color.toLowerCase() === c.toLowerCase() && (
                   <span className="absolute inset-0 flex items-center justify-center">
                     <div className="w-2 h-2 bg-white rounded-full shadow-sm ring-1 ring-black/5" />
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
