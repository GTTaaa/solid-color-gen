import { Palette } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full py-8 flex items-center justify-center z-50 relative">
      <div className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-500 ease-out cursor-default">
        <div className="p-2 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black group-hover:rotate-12 transition-transform duration-500">
          <Palette className="w-4 h-4" />
        </div>
        <h1 className="text-sm font-bold tracking-widest text-gray-900 dark:text-white uppercase opacity-90">
          Solid Color
        </h1>
      </div>
    </header>
  );
}
