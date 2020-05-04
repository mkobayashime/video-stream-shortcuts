"use strict"

// media[DOM]: Video to be handled
const toggleFullsceen = (media) => {
  if (!document.fullscreenElement) {
    media.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

export default toggleFullsceen
