"use strict"

/**
 * @param {HTMLVideoElement} media - Video element to be handled
 */
const toggleFullsceen = (media) => {
  if (!document.fullscreenElement) {
    media.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

export default toggleFullsceen
