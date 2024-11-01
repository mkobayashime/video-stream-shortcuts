import changePlaybackSpeed from "../methods/changePlaybackSpeed";
import isTyping from "../methods/isTyping";
import { loadConfig } from "../methods/loadConfig";
import { seek } from "../methods/seek";
import togglePause from "../methods/togglePause";
import type { StorageSync } from "../types/storage";

class daznHandler {
  media: HTMLVideoElement | null;
  config: StorageSync;

  constructor({ config }: { config: StorageSync }) {
    this.media = null;
    this.config = config;
  }

  watch() {
    this.findMedia();
    this.listenShortcuts();
  }

  findMedia() {
    window.setInterval(() => {
      const media = document.getElementsByTagName("video")[0];

      if (media !== this.media) {
        this.media = media;
      }
    }, 250);
  }

  listenShortcuts() {
    document.onkeyup = (e) => {
      if (!this.media) return;

      const seekSec = this.config["seek-sec"];

      if (!isTyping()) {
        switch (e.key) {
          case "k":
            if (this.config["keys-k"]) {
              togglePause(this.media);
            }
            break;
          case "j":
            if (this.config["keys-j"] && typeof seekSec === "number") {
              seek({
                media: this.media,
                direction: "backward",
                seekSec,
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
            }
            break;
          case "f":
            if (this.config["keys-f"]) {
              const fullscreenButton = document.getElementsByClassName(
                "fullscreen___fullscreen___1OXBx",
              )[0] as HTMLElement | undefined;
              if (fullscreenButton) fullscreenButton.click();
            }
            break;
          case "m":
            if (this.config["keys-m"]) {
              const muteButton = document.getElementsByClassName(
                "volumeControl___volume-mute-unmute___28Jvb",
              )[0] as HTMLElement | undefined;
              if (muteButton) muteButton.click();
            }
            break;
          case "<": {
            if (this.config["keys-left-arrow"]) {
              changePlaybackSpeed(this.media, "decrease");
            }
            break;
          }
          case ">": {
            if (this.config["keys-right-arrow"]) {
              changePlaybackSpeed(this.media, "increase");
            }
            break;
          }
        }
      }
    };
  }
}

// Check if DAZN is enabled in setting
loadConfig().then((config) => {
  if (config["sites-dazn"]) {
    const handler = new daznHandler({ config });
    handler.watch();
  }
});
