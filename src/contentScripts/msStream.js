"use strict"

import togglePause from "../methods/togglePause"
import seek from "../methods/seek"
import toggleFullscreen from "../methods/toggleFullscreen"
import toggleMute from "../methods/toggleMute"
import isTyping from "../methods/isTyping"

// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "msStreamUpdated") {
    getVideo()
  }
})

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

  const changePlaybackSpeed = (direction) => {
    const curSpeed = media.playbackRate
    if (direction === "increase") {
      if (curSpeed !== 2) {
        media.playbackRate = curSpeed + 0.25
      }
    } else if (direction === "decrease") {
      if (curSpeed !== 0.5) {
        media.playbackRate = curSpeed - 0.25
      }
    } else {
      throw '"direction" must be either of "increase" or "decrease"'
    }
  }

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
          changePlaybackSpeed("decrease")
          break
        case ">":
          changePlaybackSpeed("increase")
          break
      }
    }
  }
}
