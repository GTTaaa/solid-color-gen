"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PreviewCanvas from "@/components/PreviewCanvas";
import ColorPicker from "@/components/ColorPicker";
import SizeControl from "@/components/SizeControl";
import { downloadSolidColor } from "@/lib/utils";

export default function Home() {
  const [color, setColor] = useState<string>("#9BB0C1");
  const [width, setWidth] = useState<number>(1170);
  const [height, setHeight] = useState<number>(2532);

  const handleDownload = () => {
    downloadSolidColor(color, width, height);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      {/* Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-400/20 blur-[100px]" />
      </div>

      <Header />
      
      <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto p-4 md:p-8 grid md:grid-cols-2 gap-8 items-start">
        
        {/* Left: Preview Section - Sticky on Desktop */}
        <section className="md:sticky md:top-24">
          <div className="bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white/50 dark:border-white/10">
            <PreviewCanvas color={color} width={width} height={height} />
          </div>
        </section>

        {/* Right: Controls Section */}
        <div className="space-y-6">
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/20 dark:border-white/10 space-y-8">
            <ColorPicker color={color} onChange={setColor} />
            
            <hr className="border-gray-200 dark:border-gray-800" />
            
            <SizeControl 
              width={width} 
              height={height} 
              onChange={(w, h) => {
                setWidth(w);
                setHeight(h);
              }} 
            />
            
            <button
              onClick={handleDownload}
              className="group w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              Download Wallpaper
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
