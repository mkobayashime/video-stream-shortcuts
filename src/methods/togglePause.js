"use strict"

const togglePause = (media) => {
  if (media.paused) {
    media.play()
  } else {
    media.pause()
  }
}

export default togglePause
