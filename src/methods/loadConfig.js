"use strict"

const loadConfig = (key) => {
  return new Promise((resolve) => {
    if (!key) {
      chrome.storage.sync.get((result) => {
        resolve(result)
      })
    } else {
      chrome.storage.sync.get([key], (result) => {
        resolve(result[key])
      })
    }
  })
}

export default loadConfig
