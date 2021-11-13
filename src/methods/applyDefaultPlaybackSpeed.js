"use strict"

import loadConfig from "../methods/loadConfig"

/**
 * @param {HTMLVideoElement} media - Video element to be handled
 * @param {string} key - Key to get the default playback speed
 */
const applyDefaultPlaybackSpeed = (media, key) => {
  loadConfig(key).then((value) => {
    media.addEventListener("loadeddata", () => {
      media.playbackRate = value
    })
  })
}

export default applyDefaultPlaybackSpeed
