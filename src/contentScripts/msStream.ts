import changePlaybackSpeed from "../methods/changePlaybackSpeed";
import { createIndicator } from "../methods/createIndicator";
import isTyping from "../methods/isTyping";
import loadConfig from "../methods/loadConfig";
import { decimalSeek, seek } from "../methods/seek";
import toggleMute from "../methods/toggleMute";
import togglePause from "../methods/togglePause";
import type { StorageSync } from "../types/storage";

class MsStreamHandler {
  media: HTMLVideoElement | null;
  config: StorageSync;
  preVolume: number | false;

  constructor({ config }: { config: StorageSync }) {
    this.media = null;
    this.config = config;
    this.preVolume = 1;
  }

  watch() {
    this.findMedia();
    this.watchShortcuts();
  }

  findMedia() {
    window.setInterval(() => {
      const media = document.getElementsByTagName("video")[0];

      if (media !== this.media) {
        this.media = media;

        if (this.media) {
          this.applyDefaultPlaybackSpeed();
        }
      }
    }, 250);
  }

  applyDefaultPlaybackSpeed() {
    const media = this.media;
    if (!media) return;

    const loadedAndPlayed = Promise.all([
      new Promise((resolve) => {
        media.addEventListener("loadeddata", () => resolve(true));
      }),
      new Promise((resolve) => {
        media.addEventListener("play", () => resolve(true));
      }),
    ]);

    loadedAndPlayed.then(() => {
      globalThis.setTimeout(() => {
        const enabled = this.config["speed-ms-stream"];
        if (enabled) {
          media.playbackRate = enabled;
        }
      }, 500);
    });
  }

  callIndicatorCreator(props: createIndicator.PropsWithoutWrapper) {
    const wrapper = document.getElementsByTagName("video")[0].parentNode as
      | HTMLElement
      | undefined;
    if (!wrapper) return;

    wrapper.style.position = "absolute";
    wrapper.style.width = "100%";
    wrapper.style.height = "100%";
    wrapper.style.top = "0";
    wrapper.style.left = "0";

    createIndicator({
      ...props,
      wrapper,
    });
  }

  watchShortcuts() {
    document.onkeyup = (e) => {
      if (!this.media) return;

      const seekSec = this.config["seek-sec"];

      if (!isTyping()) {
        switch (e.key) {
          case "k":
            if (this.config["keys-k"]) {
              togglePause(this.media);
              this.callIndicatorCreator({
                type: "icon",
                id: "togglePause",
                media: this.media,
              });
            }
            break;
          case "j":
            if (this.config["keys-j"] && typeof seekSec === "number") {
              seek({
                media: this.media,
                direction: "backward",
                seekSec,
              });
              this.callIndicatorCreator({
                type: "icon",
                id: "seekBackward",
                media: this.media,
              });
            }
            break;
          case "l":
            if (this.config["keys-l"] && typeof seekSec === "number") {
              seek({
                media: this.media,
                direction: "forward",
                seekSec,
              });
              this.callIndicatorCreator({
                type: "icon",
                id: "seekForward",
                media: this.media,
              });
            }
            break;
          case "f":
            if (this.config["keys-f"]) {
              // Use default fullscreen button on the page instead of /methods/toggleFullscreen.js
              // in order not to make the video controls invisible in fullscreen mode
              const fullscreenControlElement = document.getElementsByClassName(
                "vjs-fullscreen-control",
              )[0];

              if (fullscreenControlElement instanceof HTMLElement) {
                fullscreenControlElement.click();
              }
            }
            break;
          case "m":
            if (this.config["keys-m"]) {
              this.preVolume = toggleMute(
                this.media,
                this.preVolume || undefined,
              );
              if (this.media.volume !== 0) {
                this.callIndicatorCreator({
                  type: "text",
                  text: Math.round(this.media.volume * 100).toString() + "%",
                });
              } else {
                this.callIndicatorCreator({
                  type: "icon",
                  id: "mute",
                  media: this.media,
                });
              }
            }
            break;
          case "<": {
            if (this.config["keys-left-arrow"]) {
              const curSpeed = changePlaybackSpeed(this.media, "decrease");
              this.callIndicatorCreator({
                type: "text",
                text: curSpeed.toString() + "x",
              });
            }
            break;
          }
          case ">": {
            if (this.config["keys-right-arrow"]) {
              const curSpeed = changePlaybackSpeed(this.media, "increase");
              this.callIndicatorCreator({
                type: "text",
                text: curSpeed.toString() + "x",
              });
            }
            break;
          }
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9": {
            if (this.config[`keys-decimal`]) {
              decimalSeek({
                media: this.media,
                numericKey: e.key,
              });
              this.callIndicatorCreator({
                type: "text",
                text: e.key,
              });
            }
            break;
          }
        }
      }
    };
  }
}

loadConfig().then((config) => {
  if (config["sites-ms-stream"]) {
    const handler = new MsStreamHandler({ config });
    handler.watch();
  }
});
