"use strict"

import { seekSec } from "../state/seekSec"

const seek = ({ media, direction, cacheRequired = false }) => {
  if (direction === "forward") {
    const curTime = media.currentTime
    media.currentTime = curTime + seekSec
    if (cacheRequired) {
      cache(media)
    }
  } else if (direction === "backward") {
    const curTime = media.currentTime
    media.currentTime = curTime - seekSec > 0 ? curTime - seekSec : 0
    if (cacheRequired) {
      cache(media)
    }
  } else {
    throw '"direction" must be either of "forward" or "backward"'
  }
}

// Pause or Resume once and then undo it to load the new frame
const cache = (media) => {
  if (media.paused) {
    media.play()
    media.pause()
  } else {
    media.pause()
    media.play()
  }
}

export default seek
