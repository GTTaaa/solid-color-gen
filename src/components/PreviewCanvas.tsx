interface PreviewCanvasProps {
  color: string;
  width: number;
  height: number;
}

export default function PreviewCanvas({ color, width, height }: PreviewCanvasProps) {
  return (
    <div className="w-full aspect-square bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center relative border border-gray-200 dark:border-gray-800 shadow-inner">
      {/* Background pattern for transparency (optional, but good for context) */}
      <div className="absolute inset-0 opacity-20" style={{ 
        backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
        backgroundSize: '10px 10px' 
      }} />
      
      {/* Preview Box - Scaled down to fit */}
      <div 
        className="relative shadow-lg transition-colors duration-200"
        style={{
          backgroundColor: color,
          aspectRatio: `${width}/${height}`,
          height: width > height ? 'auto' : '70%',
          width: width > height ? '70%' : 'auto',
          maxHeight: '80%',
          maxWidth: '80%'
        }}
      >
        {/* Dimensions Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20 text-white text-xs font-mono">
          {width}x{height}
        </div>
      </div>
    </div>
  );
}
