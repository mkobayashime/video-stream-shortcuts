"use strict"

// eslint-disable-next-line no-undef
chrome.runtime.onInstalled.addListener(() => {
  const sitesConfigKeys = ["sites-prime-video", "sites-ted", "sites-ms-stream"]
  const keysConfigKeys = [
    "keys-k",
    "keys-j",
    "keys-l",
    "keys-f",
    "keys-m",
    "keys-left-arrow",
    "keys-right-arrow",
  ]

  const initSitesAndKeysConfig = (key) => {
    // eslint-disable-next-line no-undef
    chrome.storage.sync.get([key], (result) => {
      if (result[key] === undefined) {
        // eslint-disable-next-line no-undef
        chrome.storage.sync.set({ [key]: true })
      }
    })
  }

  sitesConfigKeys.forEach((key) => {
    initSitesAndKeysConfig(key)
  })
  keysConfigKeys.forEach((key) => {
    initSitesAndKeysConfig(key)
  })

  // eslint-disable-next-line no-undef
  chrome.storage.sync.get(["seek-sec"], (result) => {
    if (result["seek-sec"] === undefined) {
      // eslint-disable-next-line no-undef
      chrome.storage.sync.set({ "seek-sec": 10 })
    }
  })

  // eslint-disable-next-line no-undef
  chrome.runtime.openOptionsPage()
})

const msStreamUrl = "web.microsoftstream.com/video/"

// eslint-disable-next-line no-undef
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    if (tab.url.indexOf(msStreamUrl) !== -1) {
      // eslint-disable-next-line no-undef
      chrome.tabs.sendMessage(tabId, {
        type: "updated",
      })
    }
  }
})
