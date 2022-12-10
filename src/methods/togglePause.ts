"use strict"

/**
 * @param {HTMLVideoElement} media - Video element to be handled
 */
const togglePause = (media) => {
  if (media.paused) {
    media.play()
  } else {
    media.pause()
  }
}

export default togglePause
