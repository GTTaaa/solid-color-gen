import { Palette } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full py-4 lg:py-8 flex items-center justify-center z-50 relative pointer-events-none">
      <div className="group flex items-center gap-3 px-4 py-2 lg:px-6 lg:py-3 rounded-full bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-500 ease-out pointer-events-auto cursor-default">
        <div className="p-1.5 lg:p-2 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black group-hover:rotate-12 transition-transform duration-500">
          <Palette className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
        </div>
        <h1 className="text-xs lg:text-sm font-bold tracking-widest text-gray-900 dark:text-white uppercase opacity-90">
          Solid Color
        </h1>
      </div>
    </header>
  );
}
