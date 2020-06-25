"use strict"

import loadConfig from "../methods/loadConfig"

// media[DOM]: Video to be handled
// key[string]: Key to get the default playback speed
const applyDefaultPlaybackSpeed = (media, key) => {
  loadConfig(key).then((value) => {
    media.addEventListener("loadeddata", () => {
      media.playbackRate = value
    })
  })
}

export default applyDefaultPlaybackSpeed
