import type { StorageSync } from "../types/storage";
import { getConfig } from "./getConfig";

/**
 * @param {HTMLVideoElement} media - Video element to be handled
 * @param {string} key -
 */
const applyDefaultPlaybackSpeed = (
  media: HTMLVideoElement,
  /**
   * Key to get the default playback speed
   */
  key: keyof StorageSync,
) => {
  getConfig(key).then((value) => {
    if (typeof value === "number") {
      media.addEventListener("loadeddata", () => {
        media.playbackRate = value;
      });
    }
  });
};

export default applyDefaultPlaybackSpeed;
