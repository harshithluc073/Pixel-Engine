function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

function hslToRgb(h, s, l) {
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255];
}

export const applyFilter = (imageDataUrl, prompt) => {
  // Log only in development mode
  if (import.meta.env.DEV) {
    console.log('Sending prompt to Nano Banana API:', prompt);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      if (prompt.type === 'ADJUSTMENT') {
        if (prompt.name === 'brightness') {
          const value = prompt.value || 0;
          for (let i = 0; i < data.length; i += 4) {
            data[i] += value; // red
            data[i + 1] += value; // green
            data[i + 2] += value; // blue
          }
        } else if (prompt.name === 'contrast') {
          const value = prompt.value || 0;
          const factor = (259 * (value + 255)) / (255 * (259 - value));
          for (let i = 0; i < data.length; i += 4) {
              data[i] = factor * (data[i] - 128) + 128;
              data[i+1] = factor * (data[i+1] - 128) + 128;
              data[i+2] = factor * (data[i+2] - 128) + 128;
          }
        } else if (prompt.name === 'sharpness') {
            const value = prompt.value || 0;
             for (let i = 0; i < data.length; i += 4) {
                data[i] += value/10;
                data[i+1] += value/10;
                data[i+2] += value/10;
            }
        } else if (prompt.name === 'vignette') {
            const value = prompt.value || 0;
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);

            for (let y = 0; y < canvas.height; y++) {
                for (let x = 0; x < canvas.width; x++) {
                    const i = (y * canvas.width + x) * 4;
                    const dx = x - centerX;
                    const dy = y - centerY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const ratio = dist / maxDist;
                    const vignette = 1 - ratio * (value / 100);
                    data[i] *= vignette;
                    data[i + 1] *= vignette;
                    data[i + 2] *= vignette;
                }
            }
        } else if (prompt.name === 'grain') {
            const value = prompt.value || 0;
            for (let i = 0; i < data.length; i += 4) {
                const noise = (Math.random() - 0.5) * value;
                data[i] += noise;
                data[i + 1] += noise;
                data[i + 2] += noise;
            }
        } else if (prompt.name === 'hsl') {
            const { h, s, l } = prompt.value;
            for (let i = 0; i < data.length; i += 4) {
                const hsl = rgbToHsl(data[i], data[i + 1], data[i + 2]);
                hsl[0] += h / 360;
                hsl[1] += s / 100;
                hsl[2] += l / 100;

                hsl[0] = (hsl[0] < 0) ? hsl[0] + 1 : hsl[0] % 1;
                hsl[1] = Math.max(0, Math.min(1, hsl[1]));
                hsl[2] = Math.max(0, Math.min(1, hsl[2]));

                const rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
                data[i] = rgb[0];
                data[i + 1] = rgb[1];
                data[i + 2] = rgb[2];
            }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL());
    };
    img.onerror = reject;
    img.src = imageDataUrl;
  });
};