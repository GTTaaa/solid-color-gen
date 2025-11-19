export default function Footer() {
  return (
    <footer className="w-full p-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200/50 dark:border-gray-800/50 bg-white/40 dark:bg-gray-950/40 backdrop-blur-sm">
      <p>© {new Date().getFullYear()} ColorTools. Built for creators.</p>
    </footer>
  );
}
