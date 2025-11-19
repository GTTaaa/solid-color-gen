import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SolidColorGen",
  description: "Generate solid color backgrounds for mobile and desktop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
