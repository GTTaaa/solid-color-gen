export default function Footer() {
  return (
    <footer className="w-full p-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <p>© {new Date().getFullYear()} SolidColorGen. Built for creators.</p>
    </footer>
  );
}
