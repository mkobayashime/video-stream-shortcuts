"use strict"

import togglePause from "../methods/togglePause"
import seek from "../methods/seek"
import toggleFullscreen from "../methods/toggleFullscreen"
import toggleMute from "../methods/toggleMute"
import isTyping from "../methods/isTyping"
import changePlaybackSpeed from "../methods/changePlaybackSpeed"
import createIndicator from "../methods/createIndicator"
import loadIndicatorCss from "../methods/loadIndicatorCss"

// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "msStreamUpdated") {
    getVideo()
    loadIndicatorCss()
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

  document.onkeyup = (e) => {
    if (!isTyping(document)) {
      switch (e.key) {
        case "k":
          togglePause(media)
          callIndicatorCreator({ type: "togglePause", media })
          break
        case " ":
          togglePause(media)
          callIndicatorCreator({ type: "togglePause", media })
          break
        case "j":
          seek({
            media: media,
            direction: "backward",
          })
          callIndicatorCreator({ type: "seekBackward" })
          break
        case "l":
          seek({
            media: media,
            direction: "forward",
          })
          callIndicatorCreator({ type: "seekForward" })
          break
        case "f":
          toggleFullscreen(media, document)
          break
        case "m":
          preVolume = toggleMute(media, preVolume)
          callIndicatorCreator({
            type: "text",
            text: Math.round(media.volume * 100).toString() + "%",
          })
          break
        case "<": {
          const curSpeed = changePlaybackSpeed(media, "decrease")
          callIndicatorCreator({
            type: "text",
            text: curSpeed.toString() + "x",
          })
          break
        }
        case ">": {
          const curSpeed = changePlaybackSpeed(media, "increase")
          callIndicatorCreator({
            type: "text",
            text: curSpeed.toString() + "x",
          })
          break
        }
      }
    }
  }
}

const callIndicatorCreator = ({ type, media, text }) => {
  const video = document.getElementsByTagName("video")[0]
  const wrapper = video.parentNode.parentNode

  createIndicator({
    wrapper,
    type,
    media,
    text,
  })
}
