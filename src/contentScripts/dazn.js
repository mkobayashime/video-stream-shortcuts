"use strict"

import loadConfig from "../methods/loadConfig"
import seek from "../methods/seek"
import isTyping from "../methods/isTyping"
import changePlaybackSpeed from "../methods/changePlaybackSpeed"

window.onload = () => {
  // Check if DAZN is enabled in setting
  loadConfig().then((result) => {
    if (result["sites-dazn"]) {
      getVideo(result)
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
    if (!isTyping()) {
      switch (e.key) {
        case "k":
          if (config["keys-k"]) {
            const togglePauseButton =
              document.querySelector(
                "button[data-test-id*='PLAYER_BUTTON_PLAY']"
              ) ||
              document.querySelector(
                "button[data-test-id*='PLAYER_BUTTON_PAUSE']"
              )
            if (togglePauseButton) togglePauseButton.click()
          }
          break
        case "j":
          if (config["keys-j"]) {
            seek({
              media,
              direction: "backward",
              seekSec: config["seek-sec"],
            })
          }
          break
        case "l":
          if (config["keys-l"]) {
            seek({
              media,
              direction: "forward",
              seekSec: config["seek-sec"],
            })
          }
          break
        case "f":
          if (config["keys-f"]) {
            const fullscreenButton = document.getElementsByClassName(
              "fullscreen___fullscreen___1OXBx"
            )[0]
            if (fullscreenButton) fullscreenButton.click()
          }
          break
        case "m":
          if (config["keys-m"]) {
            const muteButton = document.getElementsByClassName(
              "volumeControl___volume-mute-unmute___28Jvb"
            )[0]
            if (muteButton) muteButton.click()
          }
          break
        case "<": {
          if (config["keys-left-arrow"]) {
            changePlaybackSpeed(media, "decrease")
          }
          break
        }
        case ">": {
          if (config["keys-right-arrow"]) {
            changePlaybackSpeed(media, "increase")
          }
          break
        }
      }
    }
  }
}
