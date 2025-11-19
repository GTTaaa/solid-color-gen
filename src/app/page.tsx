"use client";

import { useState, useEffect, Suspense } from "react";
import { Download, ArrowRight } from "lucide-react";
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
    <div className="min-h-screen flex flex-col bg-[#fafafa] dark:bg-[#0a0a0a] transition-colors duration-700 overflow-x-hidden selection:bg-black/10 dark:selection:bg-white/20">
      {/* Dynamic Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-[160px] opacity-15 dark:opacity-20 animate-blob transition-colors duration-1000 ease-in-out"
          style={{ backgroundColor: color }}
        />
        <div 
          className="absolute top-[10%] right-[-20%] w-[80%] h-[80%] rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-[160px] opacity-15 dark:opacity-20 animate-blob animation-delay-2000 transition-colors duration-1000 ease-in-out"
          style={{ backgroundColor: color }}
        />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.015] brightness-100 contrast-150" />
      </div>

      <Header />
      
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto p-6 md:p-12 lg:px-16 grid lg:grid-cols-[1.3fr,1fr] gap-16 items-start">
        
        {/* Left: Preview Section */}
        <section className="lg:sticky lg:top-32 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="relative w-full max-w-xl perspective-1000">
             <PreviewCanvas color={color} width={width} height={height} noise={noise} />
          </div>
        </section>

        {/* Right: Controls Section */}
        <div className="relative pt-4 lg:pt-12">
          <div className="bg-white/80 dark:bg-[#111]/80 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_60px_-12px_rgba(0,0,0,0.08)] dark:shadow-none border border-white/60 dark:border-white/5 space-y-12 ring-1 ring-black/5 dark:ring-white/5">
            
            <div className="space-y-10">
              <ColorPicker color={color} onChange={setColor} />
              <hr className="border-gray-100 dark:border-white/5" />
              <SizeControl 
                width={width} 
                height={height} 
                onChange={(w, h) => {
                  setWidth(w);
                  setHeight(h);
                }} 
              />
              <hr className="border-gray-100 dark:border-white/5" />
              <NoiseControl value={noise} onChange={setNoise} />
            </div>
            
            <div className="pt-2">
              <button
                onClick={handleDownload}
                className="group w-full py-5 px-6 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl font-bold text-lg shadow-xl shadow-black/5 dark:shadow-white/5 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Download className="w-5 h-5" />
                <span>Download Wallpaper</span>
                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
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
