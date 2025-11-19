import { Palette } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full p-6 flex items-center justify-center z-50 relative">
      <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/40 dark:bg-black/20 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-sm">
        <Palette className="w-5 h-5 text-gray-900 dark:text-white" />
        <h1 className="text-sm font-bold tracking-wide text-gray-900 dark:text-white uppercase">
          Solid Color
        </h1>
      </div>
    </header>
  );
}
