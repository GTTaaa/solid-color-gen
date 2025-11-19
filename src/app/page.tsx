"use client";

import { useState, useEffect, Suspense } from "react";
import { Download } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PreviewCanvas from "@/components/PreviewCanvas";
import ColorPicker from "@/components/ColorPicker";
import SizeControl from "@/components/SizeControl";
import NoiseControl from "@/components/NoiseControl";
import { downloadSolidColor } from "@/lib/utils";

function ColorGenerator() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize state from URL or defaults
  const [color, setColor] = useState<string>(searchParams.get("color") || "#9BB0C1");
  const [width, setWidth] = useState<number>(() => {
    const w = searchParams.get("width");
    return w ? parseInt(w) : 1170;
  });
  const [height, setHeight] = useState<number>(() => {
    const h = searchParams.get("height");
    return h ? parseInt(h) : 2532;
  });
  const [noise, setNoise] = useState<number>(() => {
    const n = searchParams.get("noise");
    return n ? parseInt(n) : 0;
  });

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Update params
    if (color) params.set("color", color);
    if (width) params.set("width", width.toString());
    if (height) params.set("height", height.toString());
    if (noise > 0) params.set("noise", noise.toString());
    else params.delete("noise");
    
    // Replace URL without reloading
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [color, width, height, noise, pathname, router, searchParams]);

  const handleDownload = () => {
    downloadSolidColor(color, width, height, noise);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#050505] transition-colors duration-700 overflow-hidden selection:bg-black/10 dark:selection:bg-white/20">
      {/* Dynamic Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 dark:opacity-10 animate-blob transition-colors duration-1000 ease-in-out"
          style={{ backgroundColor: color }}
        />
        <div 
          className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 dark:opacity-10 animate-blob animation-delay-2000 transition-colors duration-1000 ease-in-out"
          style={{ backgroundColor: color }}
        />
        <div 
          className="absolute bottom-[-20%] left-[20%] w-[70%] h-[70%] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 dark:opacity-10 animate-blob animation-delay-4000 transition-colors duration-1000 ease-in-out"
          style={{ backgroundColor: color }}
        />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] brightness-100 contrast-150" />
      </div>

      <Header />
      
      <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto p-6 md:p-12 grid lg:grid-cols-[1.2fr,1fr] gap-12 items-start">
        
        {/* Left: Preview Section */}
        <section className="lg:sticky lg:top-32 flex flex-col items-center justify-center py-8">
          <div className="relative w-full max-w-lg group perspective-1000">
             <div className="absolute -inset-4 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-700" />
             <PreviewCanvas color={color} width={width} height={height} noise={noise} />
          </div>
        </section>

        {/* Right: Controls Section */}
        <div className="relative">
          <div className="bg-white/70 dark:bg-[#111]/70 backdrop-blur-xl rounded-[2rem] p-8 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] dark:shadow-none border border-white/40 dark:border-white/5 space-y-10 ring-1 ring-black/5 dark:ring-white/5">
            
            <div className="space-y-8">
              <ColorPicker color={color} onChange={setColor} />
              <hr className="border-gray-200/60 dark:border-white/5" />
              <SizeControl 
                width={width} 
                height={height} 
                onChange={(w, h) => {
                  setWidth(w);
                  setHeight(h);
                }} 
              />
              <NoiseControl value={noise} onChange={setNoise} />
            </div>
            
            <div className="pt-4">
              <button
                onClick={handleDownload}
                className="group w-full py-5 px-6 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl font-bold text-lg shadow-xl shadow-black/10 dark:shadow-white/5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Download className="w-6 h-6" />
                <span>Download Wallpaper</span>
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <ColorGenerator />
    </Suspense>
  );
}
