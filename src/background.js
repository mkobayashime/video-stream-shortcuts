"use strict"

// eslint-disable-next-line no-undef
chrome.runtime.onInstalled.addListener(() => {
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
