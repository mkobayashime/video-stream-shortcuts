"use strict"

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

  // Set all sites/keys config to true when no config found
  const initSitesAndKeysConfig = (key) => {
    chrome.storage.sync.get([key], (result) => {
      if (result[key] === undefined) {
        chrome.storage.sync.set({ [key]: true })
      }
    })
  }
  for (const key of sitesConfigKeys) {
    initSitesAndKeysConfig(key)
  }
  for (const key of keysConfigKeys) {
    initSitesAndKeysConfig(key)
  }

  // Set seek-sec to 10 when no config found
  chrome.storage.sync.get(["seek-sec"], (result) => {
    if (result["seek-sec"] === undefined) {
      chrome.storage.sync.set({ "seek-sec": 10 })
    }
  })

  // Open options page when the extension is installed/updated
  chrome.runtime.openOptionsPage()
})

// Send message to MS Stream tab when it's transitioned to the new page
const msStreamUrl = "web.microsoftstream.com/video/"
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    if (tab.url.indexOf(msStreamUrl) !== -1) {
      chrome.tabs.sendMessage(tabId, {
        type: "updated",
      })
    }
  }
})
