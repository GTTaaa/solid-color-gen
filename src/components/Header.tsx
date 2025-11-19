import { Palette } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full p-4 flex items-center justify-center border-b border-gray-200/50 dark:border-gray-800/50 bg-white/60 dark:bg-gray-950/60 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Palette className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ColorTools
        </h1>
      </div>
    </header>
  );
}
