// Artwork.
const downloadImage = (src, link, filename) => {
  const image = new Image();

  image.crossOrigin = "anonymous";
  image.src = src;

  image.onload = () => {
    const canvas = document.createElement("canvas");

    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    canvas.toBlob((blob) => {
      link.download = filename;
      link.href = window.URL.createObjectURL(blob);

      link.click();

      setTimeout(() => {
        window.URL.revokeObjectURL(link.href);
      }, 100);
    }, "image/png");
  };
};
const downloadPokemonArtwork = () => {
  const { name, artwork } = downloads;

  const link = document.createElement("a");
  const src = artwork;
  const filename = `${name}'s official artwork.png`;

  downloadImage(src, link, filename);
};

// Sprites.
const downloadPokemonSprites = () => {
  const { name, sprites } = downloads;

  for (const [title, spriteSrc] of Object.entries(sprites)) {
    const link = document.createElement("a");
    const filename = `${name}'s ${title}`;
    const src = spriteSrc;
    downloadImage(src, link, filename);
  }
};

// Stats.
const downloadTheStats = (content, link, filename, contentType) => {
  const blob = new Blob([content], { type: contentType });

  //Set the name of the download file.
  link.download = filename;

  link.href = window.URL.createObjectURL(blob);

  link.click();

  setTimeout(() => {
    window.URL.revokeObjectURL(link.href);
  }, 100);
};
const downloadPokemonStats = () => {
  const { name, stats } = downloads;

  const link = document.createElement("a");
  const filename = `${name}'s stats.txt`;
  const content = stats;
  const contentType = "text";
  downloadTheStats(content, link, filename, contentType);
};

// Event listeners.
downloadArtwork.addEventListener("click", downloadPokemonArtwork);
downloadStats.addEventListener("click", downloadPokemonStats);
downloadSprites.addEventListener("click", downloadPokemonSprites);
