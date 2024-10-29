const toggleMute = (
  media: HTMLVideoElement,
  /**
   * Volume to be set in unmuting
   * `undefined` for `1` (maximum volume)
   */
  preVolume?: number,
) => {
  if (media.volume !== 0) {
    const copiedPreVolume = media.volume;
    media.volume = 0;
    return copiedPreVolume;
  }

  if (preVolume) {
    media.volume = preVolume;
  } else {
    media.volume = 1;
  }
  return false;
};

export default toggleMute;
