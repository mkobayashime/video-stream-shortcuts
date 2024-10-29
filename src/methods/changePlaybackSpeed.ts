/**
 * Returns playback rate after changed
 */
const changePlaybackSpeed = (
  media: HTMLVideoElement,
  direction: "increase" | "decrease",
) => {
  const curSpeed = media.playbackRate;
  if (direction === "increase") {
    if (curSpeed !== 2) {
      media.playbackRate = curSpeed + 0.25;
    }
    return media.playbackRate;
  }

  if (direction === "decrease") {
    if (curSpeed !== 0.5) {
      media.playbackRate = curSpeed - 0.25;
    }
    return media.playbackRate;
  }

  throw '"direction" must be either of "increase" or "decrease"';
};

export default changePlaybackSpeed;
