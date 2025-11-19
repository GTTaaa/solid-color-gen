import { MORANDI_COLORS } from "@/lib/utils";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Color Selection
      </label>
      <div className="flex flex-col gap-4">
        {/* Input and Color Picker */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">#</span>
            <input
              type="text"
              value={color.replace('#', '')}
              onChange={(e) => {
                const val = e.target.value;
                if (/^[0-9A-Fa-f]{0,6}$/.test(val)) {
                  onChange(`#${val}`);
                }
              }}
              className="w-full pl-7 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px]"
              placeholder="Hex Code"
            />
          </div>
          <input
            type="color"
            value={color.length === 7 ? color : '#000000'}
            onChange={(e) => onChange(e.target.value)}
            className="h-[44px] w-[44px] p-1 border border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer bg-white dark:bg-gray-800"
          />
        </div>

        {/* Presets */}
        <div>
          <span className="text-xs text-gray-500 dark:text-gray-400 mb-2 block">Morandi Presets</span>
          <div className="grid grid-cols-8 gap-2">
            {MORANDI_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => onChange(c)}
                className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ backgroundColor: c }}
                aria-label={`Select color ${c}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
