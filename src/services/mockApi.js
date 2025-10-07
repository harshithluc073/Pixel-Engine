export const applyFilter = (imageDataUrl, prompt) => {
  console.log('Sending prompt to Nano Banana API:', prompt);

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
        }
      }

      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL());
    };
    img.onerror = reject;
    img.src = imageDataUrl;
  });
};