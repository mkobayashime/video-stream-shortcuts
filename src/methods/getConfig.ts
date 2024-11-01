import type { StorageSync } from "../types/storage";

/**
 * Load config in `chrome.storage` with key
 */
async function getConfig(key: string): Promise<unknown>;
async function getConfig(key?: undefined): Promise<StorageSync>;
async function getConfig(
  /**
   * Key of the config to get. `undefined` to get all the configs.
   */
  key?: string,
): Promise<StorageSync> {
  if (!key) {
    return await chrome.storage.sync.get();
  }

  const values = await chrome.storage.sync.get([key]);
  return values[key];
}

export { getConfig };
