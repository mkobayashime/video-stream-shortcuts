import type { StorageSync } from "../types/storage";

/**
 * Load config in `chrome.storage` with key
 */
const loadConfig = (
  /**
   * Key of the config to get. `undefined` to get all the configs.
   */
  key?: string,
): Promise<StorageSync> => {
  return new Promise((resolve) => {
    if (!key) {
      chrome.storage.sync.get((result) => {
        resolve(result);
      });
    } else {
      chrome.storage.sync.get([key], (result) => {
        resolve(result[key]);
      });
    }
  });
};

export default loadConfig;
