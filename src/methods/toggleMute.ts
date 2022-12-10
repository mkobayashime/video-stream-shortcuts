"use strict"

const toggleMute = (
  media: HTMLVideoElement,
  /**
   * Volume to be set in unmuting
   * `undefined` for `1` (maximum volume)
   */
  preVolume?: number
) => {
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
