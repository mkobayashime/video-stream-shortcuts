"use strict"

import togglePause from "../methods/togglePause"
import seek from "../methods/seek"
import toggleFullscreen from "../methods/toggleFullscreen"
import toggleMute from "../methods/toggleMute"
import isTyping from "../methods/isTyping"
import changePlaybackSpeed from "../methods/changePlaybackSpeed"
import createIndicator from "../methods/createIndicator"
import loadIndicatorCss from "../methods/loadIndicatorCss"

window.onload = () => {
  getVideo()
  loadIndicatorCss()
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
          callIndicatorCreator({ type: "icon", id: "togglePause", media })
          break
        case "j":
          seek({
            media,
            direction: "backward",
          })
          callIndicatorCreator({ type: "icon", id: "seekBackward" })
          break
        case "l":
          seek({
            media,
            direction: "forward",
          })
          callIndicatorCreator({ type: "icon", id: "seekForward" })
          break
        case "f":
          toggleFullscreen(media, document)
          break
        case "m":
          preVolume = toggleMute(media, preVolume)
          if (media.volume !== 0) {
            callIndicatorCreator({
              type: "text",
              text: Math.round(media.volume * 100).toString() + "%",
            })
          } else {
            callIndicatorCreator({ type: "icon", id: "mute" })
          }
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

const callIndicatorCreator = ({ type, id, text, media }) => {
  const wrapper = document.getElementsByTagName("video")[0].parentNode

  createIndicator({
    type,
    id,
    text,
    wrapper,
    media,
  })
}
