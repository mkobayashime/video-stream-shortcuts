import changePlaybackSpeed from "../methods/changePlaybackSpeed";
import { createIndicator } from "../methods/createIndicator";
import isTyping from "../methods/isTyping";
import { loadConfig } from "../methods/loadConfig";
import { decimalSeek, seek } from "../methods/seek";
import toggleFullscreen from "../methods/toggleFullscreen";
import toggleMute from "../methods/toggleMute";
import togglePause from "../methods/togglePause";
import type { StorageSync } from "../types/storage";

window.onload = () => {
  // Check if TED is enabled in setting
  loadConfig().then((result) => {
    if (result["sites-ted"]) {
      getVideo(result);
    }
  });
};

const getVideo = (config: StorageSync) => {
  const promise: Promise<HTMLVideoElement> = new Promise((resolve) => {
    const interval = window.setInterval(() => {
      const media = document.getElementsByTagName("video")[0] as
        | HTMLVideoElement
        | undefined;
      if (media) {
        window.clearInterval(interval);
        resolve(media);
      }
    }, 250);
  });

  promise.then((media) => {
    setShortcuts(media, config);
  });
};

const setShortcuts = (media: HTMLVideoElement, config: StorageSync) => {
  let preVolume: number | false;

  const seekSec = config["seek-sec"];

  document.onkeyup = (e) => {
    if (!isTyping()) {
      switch (e.key) {
        case "k":
          if (config["keys-k"]) {
            togglePause(media);
            callIndicatorCreator({ type: "icon", id: "togglePause", media });
          }
          break;
        case "j":
          if (config["keys-j"] && typeof seekSec === "number") {
            seek({
              media,
              direction: "backward",
              seekSec,
            });
            callIndicatorCreator({ type: "icon", id: "seekBackward", media });
          }
          break;
        case "l":
          if (config["keys-l"] && typeof seekSec === "number") {
            seek({
              media,
              direction: "forward",
              seekSec,
            });
            callIndicatorCreator({ type: "icon", id: "seekForward", media });
          }
          break;
        case "f":
          if (config["keys-f"]) {
            toggleFullscreen(media);
          }
          break;
        case "m":
          if (config["keys-m"]) {
            preVolume = toggleMute(media, preVolume || undefined);
            if (media.volume !== 0) {
              callIndicatorCreator({
                type: "text",
                text: `${Math.round(media.volume * 100).toString()}%`,
              });
            } else {
              callIndicatorCreator({ type: "icon", id: "mute", media });
            }
          }
          break;
        case "<": {
          if (config["keys-left-arrow"]) {
            const curSpeed = changePlaybackSpeed(media, "decrease");
            callIndicatorCreator({
              type: "text",
              text: `${curSpeed.toString()}x`,
            });
          }
          break;
        }
        case ">": {
          if (config["keys-right-arrow"]) {
            const curSpeed = changePlaybackSpeed(media, "increase");
            callIndicatorCreator({
              type: "text",
              text: `${curSpeed.toString()}x`,
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
          if (config["keys-decimal"]) {
            decimalSeek({
              media: media,
              numericKey: e.key,
            });
            callIndicatorCreator({
              type: "text",
              text: e.key,
            });
          }
          break;
        }
      }
    }
  };
};

// Page specific wrapper of methods/createIndicator.ts
const callIndicatorCreator = (props: createIndicator.PropsWithoutWrapper) => {
  const wrapper = document.getElementsByTagName("video")[0].parentNode as
    | HTMLElement
    | undefined;

  if (!wrapper) return;

  createIndicator({ ...props, wrapper });
};
