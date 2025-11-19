export default function Footer() {
  return (
    <footer className="w-full py-8 text-center relative z-10">
      <p className="text-sm text-gray-400 dark:text-gray-600 font-medium tracking-wide">
        © {new Date().getFullYear()} Solid Color. Crafted for creators.
      </p>
    </footer>
  );
}
