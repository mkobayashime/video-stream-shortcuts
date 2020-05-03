"use strict"

import loadConfig from "../methods/loadConfig"
import togglePause from "../methods/togglePause"
import seek from "../methods/seek"
import toggleMute from "../methods/toggleMute"
import isTyping from "../methods/isTyping"
import changePlaybackSpeed from "../methods/changePlaybackSpeed"
import createIndicator from "../methods/createIndicator"
import loadIndicatorCss from "../methods/loadIndicatorCss"

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "updated") {
    loadConfig().then((result) => {
      if (result["sites-ms-stream"]) {
        getVideo(result)
        loadIndicatorCss()
      }
    })
  }
})

const getVideo = (config) => {
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
    setShortcuts(media, config)
  })
}

const setShortcuts = (media, config) => {
  let preVolume

  const toggleFullscreen = () => {
    document.getElementsByClassName("vjs-fullscreen-control")[0].click()
  }

  document.onkeyup = (e) => {
    if (!isTyping(document)) {
      switch (e.key) {
        case "k":
          if (config["keys-k"]) {
            togglePause(media)
            callIndicatorCreator({ type: "icon", id: "togglePause", media })
          }
          break
        case "j":
          if (config["keys-j"]) {
            seek({
              media: media,
              direction: "backward",
              seekSec: config["seek-sec"],
            })
            callIndicatorCreator({ type: "icon", id: "seekBackward" })
          }
          break
        case "l":
          if (config["keys-l"]) {
            seek({
              media: media,
              direction: "forward",
              seekSec: config["seek-sec"],
            })
            callIndicatorCreator({ type: "icon", id: "seekForward" })
          }
          break
        case "f":
          if (config["keys-f"]) {
            toggleFullscreen(media.parentNode, document)
          }
          break
        case "m":
          if (config["keys-m"]) {
            preVolume = toggleMute(media, preVolume)
            if (media.volume !== 0) {
              callIndicatorCreator({
                type: "text",
                text: Math.round(media.volume * 100).toString() + "%",
              })
            } else {
              callIndicatorCreator({ type: "icon", id: "mute" })
            }
          }
          break
        case "<": {
          if (config["keys-left-arrow"]) {
            const curSpeed = changePlaybackSpeed(media, "decrease")
            callIndicatorCreator({
              type: "text",
              text: curSpeed.toString() + "x",
            })
          }
          break
        }
        case ">": {
          if (config["keys-right-arrow"]) {
            const curSpeed = changePlaybackSpeed(media, "increase")
            callIndicatorCreator({
              type: "text",
              text: curSpeed.toString() + "x",
            })
          }
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
