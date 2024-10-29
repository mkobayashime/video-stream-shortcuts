const togglePause = (media: HTMLVideoElement) => {
  if (media.paused) {
    media.play();
  } else {
    media.pause();
  }
};

export default togglePause;
