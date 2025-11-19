export function downloadSolidColor(hex: string, width: number, height: number) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    ctx.fillStyle = hex;
    ctx.fillRect(0, 0, width, height);
    
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `solid-${hex.replace('#', '')}-${width}x${height}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    }, 'image/png');
  }
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
