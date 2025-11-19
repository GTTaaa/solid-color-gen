interface PreviewCanvasProps {
  color: string;
  width: number;
  height: number;
  noise: number;
}

export default function PreviewCanvas({ color, width, height, noise }: PreviewCanvasProps) {
  return (
    <div className="w-full h-full flex items-center justify-center relative p-4 md:p-8">
      
      {/* Preview Box */}
      <div 
        className="relative transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) group"
        style={{
          aspectRatio: `${width}/${height}`,
          height: width > height ? 'auto' : '100%',
          width: width > height ? '100%' : 'auto',
          maxHeight: '100%',
          maxWidth: '100%'
        }}
      >
        {/* Main Color Surface */}
        <div 
          className="absolute inset-0 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl transition-all duration-500 overflow-hidden ring-1 ring-black/5 dark:ring-white/10"
          style={{
            backgroundColor: color,
            boxShadow: `
              0 25px 50px -12px ${color}40,
              0 0 0 1px rgba(0,0,0,0.02)
            `
          }}
        >
          {/* Noise Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-overlay"
            style={{ 
              opacity: (noise / 100) * 0.8,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }} 
          />
        </div>

        {/* Gloss/Reflection Effects - Subtle Premium Feel */}
        <div className="absolute inset-0 rounded-[1.5rem] md:rounded-[2rem] bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay" />
        
        {/* Depth Shadow underneath */}
        <div 
          className="absolute -inset-8 -z-10 rounded-[3rem] blur-3xl opacity-40 dark:opacity-30 mix-blend-multiply dark:mix-blend-soft-light transition-all duration-700"
          style={{ backgroundColor: color }}
        />

        {/* Dimensions Info */}
        <div className="absolute -bottom-12 md:-bottom-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 z-20">
          <div className="flex items-center gap-3 px-3 py-1.5 md:px-4 md:py-2 bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-full border border-white/20 shadow-lg whitespace-nowrap">
             <span className="text-[10px] md:text-xs font-mono font-medium text-gray-600 dark:text-gray-300">
               {width} × {height}
             </span>
             {noise > 0 && (
               <>
                 <span className="w-px h-3 bg-gray-300 dark:bg-gray-700" />
                 <span className="text-[10px] md:text-xs font-mono font-medium text-gray-600 dark:text-gray-300">
                   Noise {noise}%
                 </span>
               </>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
