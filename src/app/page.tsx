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
    <>
      <Header />
      <main className="flex-1 max-w-md w-full mx-auto p-4 flex flex-col gap-6">
        
        {/* Preview Section */}
        <section>
          <PreviewCanvas color={color} width={width} height={height} />
        </section>

        {/* Controls Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 space-y-6">
          <ColorPicker color={color} onChange={setColor} />
          
          <hr className="border-gray-100 dark:border-gray-800" />
          
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
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors active:scale-[0.98] min-h-[52px]"
          >
            <Download className="w-5 h-5" />
            Download PNG
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
