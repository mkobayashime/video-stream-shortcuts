"use strict"

import loadConfig from "../methods/loadConfig"
import seek from "../methods/seek"
import isTyping from "../methods/isTyping"
import changePlaybackSpeed from "../methods/changePlaybackSpeed"

class daznHandler {
  constructor({ config }) {
    this.media = null
    this.config = config
  }

  watch() {
    this.findMedia()
    this.listenShortcuts()
  }

  findMedia() {
    window.setInterval(() => {
      const media = document.getElementsByTagName("video")[0]

      if (media !== this.media) {
        this.media = media
      }
    }, 250)
  }

  listenShortcuts() {
    document.onkeyup = (e) => {
      if (!this.media) return

      if (!isTyping()) {
        switch (e.key) {
          case "k":
            if (this.config["keys-k"]) {
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
            if (this.config["keys-j"]) {
              seek({
                media: this.media,
                direction: "backward",
                seekSec: this.config["seek-sec"],
              })
            }
            break
          case "l":
            if (this.config["keys-l"]) {
              seek({
                media: this.media,
                direction: "forward",
                seekSec: this.config["seek-sec"],
              })
            }
            break
          case "f":
            if (this.config["keys-f"]) {
              const fullscreenButton = document.getElementsByClassName(
                "fullscreen___fullscreen___1OXBx"
              )[0]
              if (fullscreenButton) fullscreenButton.click()
            }
            break
          case "m":
            if (this.config["keys-m"]) {
              const muteButton = document.getElementsByClassName(
                "volumeControl___volume-mute-unmute___28Jvb"
              )[0]
              if (muteButton) muteButton.click()
            }
            break
          case "<": {
            if (this.config["keys-left-arrow"]) {
              changePlaybackSpeed(this.media, "decrease")
            }
            break
          }
          case ">": {
            if (this.config["keys-right-arrow"]) {
              changePlaybackSpeed(this.media, "increase")
            }
            break
          }
        }
      }
    }
  }
}

// Check if DAZN is enabled in setting
loadConfig().then((config) => {
  if (config["sites-dazn"]) {
    const handler = new daznHandler({ config })
    handler.watch()
  }
})
