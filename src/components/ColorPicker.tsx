import { ALL_PRESETS, getRandomHex } from "@/lib/utils";
import { Copy, Check, Pipette, Dices } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [copied, setCopied] = useState(false);
  const [activePreset, setActivePreset] = useState<keyof typeof ALL_PRESETS>('trending');

  const handleCopy = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 lg:space-y-5">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide uppercase">
          Color Control
        </label>
      </div>

      <div className="flex flex-col gap-4 lg:gap-5">
        {/* Input and Color Picker */}
        <div className="flex gap-4">
          <div className="relative flex-1 group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg border border-black/5 dark:border-white/10 shadow-sm overflow-hidden cursor-pointer transition-transform duration-300 group-hover:scale-110">
              <div 
                className="w-full h-full"
                style={{ backgroundColor: color }} 
              />
              <input
                type="color"
                value={color.length === 7 ? color : '#000000'}
                onChange={(e) => onChange(e.target.value)}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              />
            </div>
            <input
              type="text"
              value={color.toUpperCase()}
              onChange={(e) => {
                const val = e.target.value.replace('#', '');
                if (/^[0-9A-Fa-f]{0,6}$/.test(val)) {
                  onChange(`#${val}`);
                }
              }}
              className="w-full pl-14 pr-12 py-2 lg:py-3 border border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800/50 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-black/5 dark:focus:ring-white/10 focus:border-gray-300 dark:focus:border-gray-600 transition-all font-mono text-lg font-medium uppercase tracking-widest text-gray-900 dark:text-white placeholder-gray-400"
              placeholder="#000000"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
              <AnimatePresence>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="mr-2 text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-md hidden sm:block"
                  >
                    Copied!
                  </motion.span>
                )}
              </AnimatePresence>
              <button
                onClick={handleCopy}
                className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-200"
                title="Copy Hex Code"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                    >
                      <Check className="w-4 h-4 text-green-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                    >
                      <Copy className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Presets */}
        <div>
          <div className="flex items-center gap-2 mb-2 overflow-x-auto pb-1 scrollbar-hide">
            {(Object.keys(ALL_PRESETS) as Array<keyof typeof ALL_PRESETS>).map((key) => (
              <button
                key={key}
                onClick={() => setActivePreset(key)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                  activePreset === key
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-black'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                {ALL_PRESETS[key].label}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
            {/* Random Button at start of grid */}
            <button
              onClick={() => onChange(getRandomHex())}
              className="group relative aspect-square rounded-xl transition-all duration-300 focus:outline-none bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
              title="Random Color"
            >
              <Dices className="w-5 h-5 text-gray-500 group-hover:rotate-180 transition-transform duration-500" />
            </button>

            {ALL_PRESETS[activePreset].colors.map((c) => (
              <button
                key={c}
                onClick={() => onChange(c)}
                className={`group relative aspect-square rounded-xl transition-all duration-300 focus:outline-none ${
                  color.toLowerCase() === c.toLowerCase() ? 'ring-2 ring-offset-2 ring-gray-900 dark:ring-white dark:ring-offset-[#111]' : ''
                }`}
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
