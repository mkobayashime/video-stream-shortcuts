"use strict"

const toggleFullsceen = (media) => {
  if (!document.fullscreenElement) {
    media.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

export default toggleFullsceen
