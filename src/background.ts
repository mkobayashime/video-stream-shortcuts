import { getConfig } from "./methods/getConfig";
import type { StorageSync } from "./types/storage";

chrome.runtime.onInstalled.addListener((details) => {
  const sitesConfigKeys = [
    "sites-dazn",
    "sites-ms-stream",
    "sites-openrec",
    "sites-prime-video",
    "sites-ted",
  ] as const;
  const keysConfigKeys = [
    "keys-k",
    "keys-j",
    "keys-l",
    "keys-f",
    "keys-m",
    "keys-left-arrow",
    "keys-right-arrow",
    "keys-decimal",
  ] as const;
  const speedsConfigKeys = ["speed-prime-video", "speed-ms-stream"] as const;

  // Set all sites/keys config to true when no config found
  const initSitesAndKeysConfig = async (key: keyof StorageSync) => {
    const enabled = await getConfig(key);
    if (enabled === undefined) {
      chrome.storage.sync.set({ [key]: true });
    }
  };
  void Promise.all(
    [...sitesConfigKeys, ...keysConfigKeys].map(initSitesAndKeysConfig),
  );

  // Set default playback speeds to 1 when no config found
  const initSpeedsConfig = async (key: keyof StorageSync) => {
    const speed = await getConfig(key);
    if (speed === undefined) {
      chrome.storage.sync.set({ [key]: 1 });
    }
  };
  void Promise.all(speedsConfigKeys.map(initSpeedsConfig));

  // Set seek-sec to 10 when no config found
  void (async () => {
    const seekSec = await getConfig("seek-sec");
    if (seekSec === undefined) {
      chrome.storage.sync.set({ "seek-sec": 10 });
    }
  })();

  // Open options page when the extension is installed/updated
  if (["install", "update"].includes(details.reason)) {
    chrome.runtime.openOptionsPage();
  }
});
