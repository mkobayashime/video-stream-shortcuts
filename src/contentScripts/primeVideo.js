"use strict"

import loadConfig from "../methods/loadConfig"
import togglePause from "../methods/togglePause"
import seek from "../methods/seek"
import isTyping from "../methods/isTyping"
import changePlaybackSpeed from "../methods/changePlaybackSpeed"
import createIndicator from "../methods/createIndicator"

window.onload = () => {
  loadConfig().then((result) => {
    if (result["sites-prime-video"]) {
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
  })
}

const setShortcuts = (media, config) => {
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

const callIndicatorCreator = ({ type, id, text, media }) => {
  const wrapper = document.getElementsByClassName("overlaysContainer")[0]

  createIndicator({
    type,
    id,
    text,
    wrapper,
    media,
  })
}
