"use strict"

// eslint-disable-next-line no-undef
chrome.runtime.onInstalled.addListener(() => {
  // eslint-disable-next-line no-undef
  chrome.storage.sync.get(["seekSec"], (result) => {
    if (!result.seekSec) {
      // eslint-disable-next-line no-undef
      chrome.storage.sync.set({ seekSec: 10 })
    }
  })
})

const matchUrl = "web.microsoftstream.com/video/"

// eslint-disable-next-line no-undef
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    if (tab.url.indexOf(matchUrl) !== -1) {
      // eslint-disable-next-line no-undef
      chrome.tabs.sendMessage(tabId, {
        type: "msStreamUpdated",
      })
    }
  }
})
