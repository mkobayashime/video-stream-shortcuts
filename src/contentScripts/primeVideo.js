"use strict"

import applyDefaultPlaybackSpeed from "../methods/applyDefaultPlaybackSpeed"
import changePlaybackSpeed from "../methods/changePlaybackSpeed"
import createIndicator from "../methods/createIndicator"
import isTyping from "../methods/isTyping"
import loadConfig from "../methods/loadConfig"
import seek from "../methods/seek"
import togglePause from "../methods/togglePause"

window.onload = () => {
  // Check if Prime Video is enabled in setting
  loadConfig().then((result) => {
    if (result["sites-prime-video"]) {
      // In Prime Video, body gets style "overflow: hidden;"
      // when the video player is displayed
      const body = document.getElementsByTagName("body")[0]
      const observer = new MutationObserver(() => {
        if (body.style.overflow === "hidden") {
          getVideo(result)
        }
      })
      observer.observe(body, {
        attributes: true,
      })
    }
  })
}

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
    applyDefaultPlaybackSpeed(media, "speed-prime-video")
  })
}

const setShortcuts = (media, config) => {
  document.onkeyup = (e) => {
    if (!isTyping()) {
      switch (e.key) {
        case "k":
          if (config["keys-k"]) {
            togglePause(media)
            if (!media.paused) {
              callIndicatorCreator({ type: "icon", id: "togglePause", media })
            }
          }
          break
        case "j":
          if (config["keys-j"]) {
            seek({
              media: media,
              direction: "backward",
              seekSec: config["seek-sec"],
              cacheRequired: true,
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
              cacheRequired: true,
            })
            callIndicatorCreator({ type: "icon", id: "seekForward" })
          }
          break
        case "m":
          if (config["keys-m"]) {
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

// Page specific wrapper of methods/createIndicator.js
const callIndicatorCreator = ({ type, id, text, media }) => {
  const wrapper = document.getElementsByClassName("webPlayerUIContainer")[0]

  createIndicator({
    type,
    id,
    text,
    wrapper,
    media,
  })
}
