"use strict"

// media[DOM]: Video to be handled
// direction[string]: "increase" or "decrease" the playback speed
const changePlaybackSpeed = (media, direction) => {
  const curSpeed = media.playbackRate
  if (direction === "increase") {
    if (curSpeed !== 2) {
      media.playbackRate = curSpeed + 0.25
    }
    return media.playbackRate
  } else if (direction === "decrease") {
    if (curSpeed !== 0.5) {
      media.playbackRate = curSpeed - 0.25
    }
    return media.playbackRate
  } else {
    throw '"direction" must be either of "increase" or "decrease"'
  }
}

export default changePlaybackSpeed
