const resizeImage = async (file, maxWidth, maxHeight) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let newWidth = img.width;
      let newHeight = img.height;

      if (img.width > maxWidth) {
        newWidth = maxWidth;
        newHeight = (img.height * maxWidth) / img.width;
      }

      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = (img.width * maxHeight) / img.height;
      }

      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      canvas.toBlob((blob) => {
        resolve(new File([blob], file.name));
      });
    };
    img.src = URL.createObjectURL(file);
  });
};

export default resizeImage;
