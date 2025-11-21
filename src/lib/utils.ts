export function downloadSolidColor(hex: string, width: number, height: number, noise: number = 0) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // 1. Fill Base Color
    ctx.fillStyle = hex;
    ctx.fillRect(0, 0, width, height);
    
    // 2. Apply Noise
    if (noise > 0) {
      const patternSize = 200; // Small pattern to repeat
      const noiseCanvas = document.createElement('canvas');
      noiseCanvas.width = patternSize;
      noiseCanvas.height = patternSize;
      const noiseCtx = noiseCanvas.getContext('2d');
      
      if (noiseCtx) {
        const imageData = noiseCtx.createImageData(patternSize, patternSize);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
          const val = Math.floor(Math.random() * 255);
          data[i] = val;     // r
          data[i + 1] = val; // g
          data[i + 2] = val; // b
          data[i + 3] = 255; // alpha
        }
        noiseCtx.putImageData(imageData, 0, 0);
        
        const pattern = ctx.createPattern(noiseCanvas, 'repeat');
        if (pattern) {
          ctx.globalCompositeOperation = 'overlay';
          ctx.globalAlpha = (noise / 100) * 0.5; // Scale down intensity slightly for better visual match
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, width, height);
          
          // Reset
          ctx.globalCompositeOperation = 'source-over';
          ctx.globalAlpha = 1;
        }
      }
    }
    
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `solid-${hex.replace('#', '')}-${width}x${height}${noise > 0 ? '-noise' : ''}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    }, 'image/png');
  }
}

export function getRandomHex(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
}

export const MORANDI_COLORS = [
  '#9BB0C1', '#B5C3CC', '#D3C0B2', '#C0A89D', // Soft Blues & Browns
  '#B6B5A6', '#9A9B91', '#D6D8C0', '#C4C8AC', // Greys & Greens
];

export const TRENDING_COLORS = [
  '#FF6B6B', '#4ECDC4', '#FFE66D', '#1A535C', // Vibrant
  '#F7FFF7', '#A8DADC', '#457B9D', '#1D3557', // Clean
];

export const Y2K_COLORS = [
  '#FF00FF', '#00FFFF', '#FFFF00', '#FF0099', // Neon
  '#CCFF00', '#9D00FF', '#FF6600', '#00FF66', // Cyber
];

export const ALL_PRESETS = {
  trending: { label: 'Trending', colors: TRENDING_COLORS },
  morandi: { label: 'Morandi', colors: MORANDI_COLORS },
  y2k: { label: 'Y2K', colors: Y2K_COLORS },
};

export const PRESET_SIZES = [
  { label: 'iPhone', width: 1170, height: 2532 },     // Mobile
  { label: 'Story', width: 1080, height: 1920 },      // Social Media Vertical
  { label: 'Square', width: 1080, height: 1080 },     // Social Media Square
  { label: 'Desktop', width: 1920, height: 1080 },    // Desktop / Video
];
