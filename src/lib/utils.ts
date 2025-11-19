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
  '#B6B5A6', '#9A9B91', '#7E8077', '#6C6E66', // Greys
  '#D3C0B2', '#C0A89D', '#B19488', '#9D8175', // Browns
  '#B5C3CC', '#9BB0C1', '#819DB5', '#6B8CA8', // Blues
  '#D6D8C0', '#C4C8AC', '#B2B899', '#9FA886', // Greens
];

export const PRESET_SIZES = [
  { label: 'iPhone Wallpaper', width: 1170, height: 2532 },
  { label: 'Instagram Square', width: 1080, height: 1080 },
  { label: 'Instagram Story', width: 1080, height: 1920 },
  { label: 'Twitter Post', width: 1200, height: 675 },
  { label: 'FHD Wallpaper', width: 1920, height: 1080 },
];
