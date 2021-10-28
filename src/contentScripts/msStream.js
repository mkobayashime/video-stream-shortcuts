"use strict"

import loadConfig from "../methods/loadConfig"
import togglePause from "../methods/togglePause"
import seek from "../methods/seek"
import toggleMute from "../methods/toggleMute"
import isTyping from "../methods/isTyping"
import changePlaybackSpeed from "../methods/changePlaybackSpeed"
import createIndicator from "../methods/createIndicator"

class MsStreamHandler {
  constructor({ config }) {
    this.media = null
    this.config = config
    this.preVolume = 1
  }

  watch() {
    this.findMedia()
    this.watchShortcuts(this.media, this.config)
  }

  findMedia() {
    window.setInterval(() => {
      const media = document.getElementsByTagName("video")[0]

      if (media !== this.media) {
        this.media = media

        if (this.media) {
          this.applyDefaultPlaybackSpeed()
        }
      }
    }, 250)
  }

  applyDefaultPlaybackSpeed() {
    const loadedAndPlayed = Promise.all([
      new Promise((resolve) => {
        this.media.addEventListener("loadeddata", () => resolve())
      }),
      new Promise((resolve) => {
        this.media.addEventListener("play", () => resolve())
      }),
    ])

    loadedAndPlayed.then(() => {
      global.setTimeout(() => {
        this.media.playbackRate = this.config["speed-ms-stream"]
      }, 500)
    })
  }

  callIndicatorCreator({ type, id, text, media }) {
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

  watchShortcuts() {
    document.onkeyup = (e) => {
      if (!this.media) return

      if (!isTyping()) {
        switch (e.key) {
          case "k":
            if (this.config["keys-k"]) {
              togglePause(this.media)
              this.callIndicatorCreator({
                type: "icon",
                id: "togglePause",
                media: this.media,
              })
            }
            break
          case "j":
            if (this.config["keys-j"]) {
              seek({
                media: this.media,
                direction: "backward",
                seekSec: this.config["seek-sec"],
              })
              this.callIndicatorCreator({ type: "icon", id: "seekBackward" })
            }
            break
          case "l":
            if (this.config["keys-l"]) {
              seek({
                media: this.media,
                direction: "forward",
                seekSec: this.config["seek-sec"],
              })
              this.callIndicatorCreator({ type: "icon", id: "seekForward" })
            }
            break
          case "f":
            if (this.config["keys-f"]) {
              // Use default fullscreen button on the page instead of /methods/toggleFullscreen.js
              // in order not to make the video controls invisible in fullscreen mode
              document
                .getElementsByClassName("vjs-fullscreen-control")[0]
                .click()
            }
            break
          case "m":
            if (this.config["keys-m"]) {
              this.preVolume = toggleMute(this.media, this.preVolume)
              if (this.media.volume !== 0) {
                this.callIndicatorCreator({
                  type: "text",
                  text: Math.round(this.media.volume * 100).toString() + "%",
                })
              } else {
                this.callIndicatorCreator({ type: "icon", id: "mute" })
              }
            }
            break
          case "<": {
            if (this.config["keys-left-arrow"]) {
              const curSpeed = changePlaybackSpeed(this.media, "decrease")
              this.callIndicatorCreator({
                type: "text",
                text: curSpeed.toString() + "x",
              })
            }
            break
          }
          case ">": {
            if (this.config["keys-right-arrow"]) {
              const curSpeed = changePlaybackSpeed(this.media, "increase")
              this.callIndicatorCreator({
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
}

loadConfig().then((config) => {
  if (config["sites-ms-stream"]) {
    const handler = new MsStreamHandler({ config })
    handler.watch()
  }
})
