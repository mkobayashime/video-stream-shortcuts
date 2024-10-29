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
  const initSitesAndKeysConfig = (key: keyof StorageSync) => {
    chrome.storage.sync.get([key], (result) => {
      if (result[key] === undefined) {
        chrome.storage.sync.set({ [key]: true });
      }
    });
  };
  for (const key of sitesConfigKeys) {
    initSitesAndKeysConfig(key);
  }
  for (const key of keysConfigKeys) {
    initSitesAndKeysConfig(key);
  }

  // Set default playback speeds to 1 when no config found
  const initSpeedsConfig = (key: keyof StorageSync) => {
    chrome.storage.sync.get([key], (result) => {
      if (result[key] === undefined) {
        chrome.storage.sync.set({ [key]: 1 });
      }
    });
  };
  for (const key of speedsConfigKeys) {
    initSpeedsConfig(key);
  }

  // Set seek-sec to 10 when no config found
  chrome.storage.sync.get(["seek-sec"], (result) => {
    if (result["seek-sec"] === undefined) {
      chrome.storage.sync.set({ "seek-sec": 10 });
    }
  });

  // Open options page when the extension is installed/updated
  if (["install", "update"].includes(details.reason)) {
    chrome.runtime.openOptionsPage();
  }
});
