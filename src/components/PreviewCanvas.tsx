interface PreviewCanvasProps {
  color: string;
  width: number;
  height: number;
}

export default function PreviewCanvas({ color, width, height }: PreviewCanvasProps) {
  return (
    <div className="w-full aspect-square flex items-center justify-center relative">
      
      {/* Preview Box */}
      <div 
        className="relative transition-all duration-500 ease-out group"
        style={{
          aspectRatio: `${width}/${height}`,
          height: width > height ? 'auto' : '85%',
          width: width > height ? '85%' : 'auto',
          maxHeight: '100%',
          maxWidth: '100%'
        }}
      >
        {/* Main Color Surface */}
        <div 
          className="absolute inset-0 rounded-3xl shadow-2xl transition-all duration-500"
          style={{
            backgroundColor: color,
            boxShadow: `0 20px 60px -10px ${color}60, 0 10px 30px -5px rgba(0,0,0,0.1)`
          }}
        />

        {/* Reflection/Gloss effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/20 to-transparent opacity-50 pointer-events-none" />

        {/* Dimensions Overlay - Always visible on hover, but subtle */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="bg-gray-900/80 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
            {width} × {height}
          </div>
        </div>
      </div>
    </div>
  );
}
