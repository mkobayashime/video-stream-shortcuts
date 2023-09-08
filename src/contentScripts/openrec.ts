import isTyping from "../methods/isTyping"
import loadConfig from "../methods/loadConfig"
import { StorageSync } from "../types/storage"

class openrecHandler {
  media: HTMLVideoElement | null
  config: StorageSync

  constructor({ config }: { config: StorageSync }) {
    this.media = null
    this.config = config
  }

  watch() {
    this.findMediaElement()
    this.listenShortcuts()
  }

  findMediaElement() {
    let i = 0

    const intervalID = window.setInterval(() => {
      const media = document.getElementsByTagName("video")[0]

      if (media) {
        this.media = media
        window.clearInterval(intervalID)
      }

      if (i > 100) {
        window.clearInterval(intervalID)
      }

      i++
    }, 250)
  }

  listenShortcuts() {
    document.addEventListener("keyup", (e) => {
      if (!this.media) return

      if (!isTyping()) {
        switch (e.key) {
          case "k": {
            if (this.config["keys-k"]) {
              if (this.media.paused) {
                this.media.play()
              } else {
                this.media.pause()
              }
            }
          }
          case "j": {
            if (this.config["keys-j"]) {
              const seekButton = Array.from(
                document.querySelectorAll<HTMLElement>(
                  "[class^='ControlBar__BottomLeftBlock'] [class^='ControlBar__SettingWrapper'] [class^='SvgIconButton__Button']"
                )
              ).find((e) => e.innerHTML.includes("rewind10s"))
              if (seekButton) seekButton.click()
            }
          }
          case "l": {
            if (this.config["keys-l"]) {
              const seekButton = Array.from(
                document.querySelectorAll<HTMLElement>(
                  "[class^='ControlBar__BottomLeftBlock'] [class^='ControlBar__SettingWrapper'] [class^='SvgIconButton__Button']"
                )
              ).find((e) => e.innerHTML.includes("proceed10s"))
              if (seekButton) seekButton.click()
            }
          }
          case "m": {
            if (this.config["keys-m"]) {
              const muteButton = document.querySelector<HTMLElement>(
                "[class^='ControlBar__BottomLeftBlock'] [class^='Volume__Wrapper'] [class^='SvgIconButton__Button']"
              )

              if (muteButton) muteButton.click()
            }
          }
        }
      }
    })
  }
}

loadConfig().then((config) => {
  if (config["sites-openrec"]) {
    const handler = new openrecHandler({ config })
    handler.watch()
  }
})
