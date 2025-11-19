import { Palette } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full p-4 flex items-center justify-center border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <Palette className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          SolidColorGen
        </h1>
      </div>
    </header>
  );
}
