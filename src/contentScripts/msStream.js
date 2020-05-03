"use strict"

import togglePause from "../methods/togglePause"
import seek from "../methods/seek"
import toggleMute from "../methods/toggleMute"
import isTyping from "../methods/isTyping"
import changePlaybackSpeed from "../methods/changePlaybackSpeed"
import createIndicator from "../methods/createIndicator"
import loadIndicatorCss from "../methods/loadIndicatorCss"

// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "updated") {
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

  const toggleFullscreen = () => {
    document.getElementsByClassName("vjs-fullscreen-control")[0].click()
  }

  document.onkeyup = (e) => {
    if (!isTyping(document)) {
      switch (e.key) {
        case "k":
          togglePause(media)
          callIndicatorCreator({ type: "icon", id: "togglePause", media })
          break
        case "j":
          seek({
            media: media,
            direction: "backward",
          })
          callIndicatorCreator({ type: "icon", id: "seekBackward" })
          break
        case "l":
          seek({
            media: media,
            direction: "forward",
          })
          callIndicatorCreator({ type: "icon", id: "seekForward" })
          break
        case "f":
          toggleFullscreen(media.parentNode, document)
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
  wrapper.style.position = "absolute"
  wrapper.style.width = "100%"
  wrapper.style.height = "100%"
  wrapper.style.top = "0"
  wrapper.style.left = "0"

  createIndicator({
    type,
    id,
    text,
    wrapper,
    media,
  })
}
