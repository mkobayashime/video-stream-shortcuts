const toggleFullsceen = (media: HTMLVideoElement) => {
  if (!document.fullscreenElement) {
    media.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

export default toggleFullsceen;
