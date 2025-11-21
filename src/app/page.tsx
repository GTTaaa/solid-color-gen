"use client";

import { useState, useEffect, Suspense } from "react";
import { Download, ArrowRight, Palette, Scaling, Sparkles } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import confetti from "canvas-confetti";
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

  const [activeTab, setActiveTab] = useState<'color' | 'size' | 'noise'>('color');

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
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: [color, '#ffffff']
    });
    downloadSolidColor(color, width, height, noise);
  };

  return (
    <div className="h-[100dvh] lg:h-auto lg:min-h-screen flex flex-col bg-[#fafafa] dark:bg-[#0a0a0a] transition-colors duration-700 overflow-hidden selection:bg-black/10 dark:selection:bg-white/20">
      {/* Dynamic Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Header Ambient */}
        <div 
          className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[150%] h-[70%] rounded-[100%] mix-blend-multiply dark:mix-blend-soft-light filter blur-[80px] opacity-20 dark:opacity-25 transition-colors duration-1000 ease-in-out"
          style={{ backgroundColor: color }}
        />
        
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

      <div className="shrink-0 relative z-50">
        <Header />
      </div>
      
      <main className="relative z-10 flex-1 flex flex-col lg:grid lg:grid-cols-[1.3fr,1fr] lg:gap-10 lg:items-start lg:max-w-7xl lg:mx-auto lg:p-8 lg:px-12 lg:w-full min-h-0">
        
        {/* Left: Preview Section */}
        {/* Mobile: Fixed top area. Desktop: Sticky sidebar */}
        <section className="shrink-0 basis-[45%] md:basis-[42%] lg:basis-auto relative z-0 flex flex-col items-center justify-center lg:sticky lg:top-24 lg:min-h-[60vh] p-4 lg:p-0">
          <div className="relative w-full h-full lg:h-auto lg:aspect-square max-w-[85%] lg:max-w-xl perspective-1000 flex items-center justify-center">
             <PreviewCanvas color={color} width={width} height={height} noise={noise} />
          </div>
        </section>

        {/* Right: Controls Section */}
        {/* Mobile: Scrollable bottom sheet with sticky footer. Desktop: Normal column */}
        <div className="flex-1 bg-white/80 dark:bg-[#111]/90 backdrop-blur-xl rounded-t-[2rem] lg:rounded-[2.5rem] shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] lg:shadow-[0_8px_60px_-12px_rgba(0,0,0,0.08)] border-t border-l border-r lg:border-b border-white/60 dark:border-white/10 overflow-hidden transition-all duration-500 flex flex-col">
          
          {/* Mobile Tabs */}
          <div className="shrink-0 px-6 pt-6 lg:hidden flex gap-2">
            {[
              { id: 'color', icon: Palette, label: 'Color' },
              { id: 'size', icon: Scaling, label: 'Size' },
              { id: 'noise', icon: Sparkles, label: 'Texture' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-300 active:scale-95 touch-manipulation ${
                  activeTab === tab.id 
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-black shadow-md ring-1 ring-black/5 dark:ring-white/10' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Scrollable Controls Area */}
          <div className="flex-1 overflow-y-auto lg:overflow-visible p-5 md:p-10 pb-0 lg:pb-10 scrollbar-hide relative">
             {/* Mobile Handle (Hidden when tabs are present to save space) */}
            <div className="lg:hidden w-12 h-1.5 bg-gray-200 dark:bg-gray-700/50 rounded-full mx-auto mb-4 hidden" />

            <div className="space-y-6 lg:space-y-10 pb-32 lg:pb-0">
              {/* Desktop: Show all. Mobile: Show active tab */}
              <div className={`${activeTab === 'color' ? 'block' : 'hidden'} lg:block animate-in fade-in slide-in-from-bottom-2 duration-300 lg:animate-none`}>
                <ColorPicker color={color} onChange={setColor} />
                {/* <hr className="border-gray-100 dark:border-white/5 mt-6 lg:mt-10 lg:block hidden" /> */}
              </div>
              
              <div className={`${activeTab === 'size' ? 'block' : 'hidden'} lg:block animate-in fade-in slide-in-from-bottom-2 duration-300 lg:animate-none`}>
                <SizeControl 
                  width={width} 
                  height={height} 
                  onChange={(w, h) => {
                    setWidth(w);
                    setHeight(h);
                  }} 
                />
                <hr className="border-gray-100 dark:border-white/5 mt-6 lg:mt-10 lg:block hidden" />
              </div>

              <div className={`${activeTab === 'noise' ? 'block' : 'hidden'} lg:block animate-in fade-in slide-in-from-bottom-2 duration-300 lg:animate-none`}>
                <NoiseControl value={noise} onChange={setNoise} />
              </div>
            </div>
          </div>
          
          {/* Sticky Download Button Footer */}
          <div className="shrink-0 p-6 pt-2 pb-8 md:p-10 md:pt-0 lg:pt-0 bg-gradient-to-t from-white/95 via-white/90 to-transparent dark:from-[#111]/95 dark:via-[#111]/90 lg:bg-none z-20 relative">
            <button
              onClick={handleDownload}
              className="group w-full py-4 lg:py-5 px-6 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl font-bold text-lg shadow-xl shadow-black/5 dark:shadow-white/5 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Download className="w-5 h-5" />
              <span>Download Wallpaper</span>
              <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </button>
          </div>
        </div>
      </main>
      
      <div className="hidden lg:block">
        <Footer />
      </div>
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
