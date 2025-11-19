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
    <div className="space-y-5 lg:space-y-7">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide uppercase">
          Color Control
        </label>
        <button
          onClick={() => onChange(getRandomHex())}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
        >
          <Shuffle className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300 group-hover:rotate-180 transition-transform duration-500" />
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">Randomize</span>
        </button>
      </div>

      <div className="flex flex-col gap-5 lg:gap-6">
        {/* Input and Color Picker */}
        <div className="flex gap-4">
          <div className="relative flex-1 group">
            <div 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg border border-black/5 dark:border-white/10 shadow-sm transition-transform duration-300 group-hover:scale-110" 
              style={{ backgroundColor: color }} 
            />
            <input
              type="text"
              value={color.toUpperCase()}
              onChange={(e) => {
                const val = e.target.value.replace('#', '');
                if (/^[0-9A-Fa-f]{0,6}$/.test(val)) {
                  onChange(`#${val}`);
                }
              }}
              className="w-full pl-14 pr-12 py-3 lg:py-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800/50 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-black/5 dark:focus:ring-white/10 focus:border-gray-300 dark:focus:border-gray-600 transition-all font-mono text-lg font-medium uppercase tracking-widest text-gray-900 dark:text-white placeholder-gray-400"
              placeholder="#000000"
            />
            <button
              onClick={handleCopy}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-200"
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
            <div className="w-[60px] h-full rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 group">
               <Pipette className="w-5 h-5 text-gray-500 group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>

        {/* Presets */}
        <div>
          <div className="grid grid-cols-6 sm:grid-cols-8 gap-3">
            {MORANDI_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => onChange(c)}
                className="group relative aspect-square rounded-xl transition-all duration-300 focus:outline-none"
                aria-label={`Select color ${c}`}
              >
                <div 
                  className="absolute inset-0 rounded-xl border border-black/5 dark:border-white/5 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300"
                  style={{ backgroundColor: c }}
                />
                {color.toLowerCase() === c.toLowerCase() && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center scale-110">
                    <div className="w-2.5 h-2.5 bg-white rounded-full shadow-sm ring-1 ring-black/10 animate-in zoom-in duration-200" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
