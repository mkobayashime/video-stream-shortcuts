"use strict"

import togglePause from "../methods/togglePause"
import seek from "../methods/seek"
import toggleFullscreen from "../methods/toggleFullscreen"
import toggleMute from "../methods/toggleMute"
import isTyping from "../methods/isTyping"
import changePlaybackSpeed from "../methods/changePlaybackSpeed"

window.onload = () => {
  getVideo()
}

const getVideo = () => {
  const promise = new Promise((resolve) => {
    const interval = window.setInterval(() => {
      const media = document.getElementsByTagName("video")[0]
      if (media) {
        window.clearInterval(interval)
        resolve(media)
      }
    }, 250)
  })

  promise.then((media) => {
    setShortcuts(media)
  })
}

const setShortcuts = (media) => {
  let preVolume

  document.onkeyup = (e) => {
    if (!isTyping(document)) {
      switch (e.key) {
        case "k":
          togglePause(media)
          break
        case " ":
          togglePause(media)
          break
        case "j":
          seek({
            media: media,
            direction: "backward",
          })
          break
        case "l":
          seek({
            media: media,
            direction: "forward",
          })
          break
        case "f":
          toggleFullscreen(media, document)
          break
        case "m":
          preVolume = toggleMute(media, preVolume)
          break
        case "<":
          changePlaybackSpeed(media, "decrease")
          break
        case ">":
          changePlaybackSpeed(media, "increase")
          break
      }
    }
  }
}
