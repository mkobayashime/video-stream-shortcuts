"use strict"

const toggleMute = (media, preVolume) => {
  if (media.volume !== 0) {
    preVolume = media.volume
    media.volume = 0
    return preVolume
  } else {
    if (preVolume) {
      media.volume = preVolume
    } else {
      media.volume = 1
    }
    return false
  }
}

export default toggleMute
