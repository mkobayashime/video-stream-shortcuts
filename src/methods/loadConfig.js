"use strict"

// Load config in chrome.storage with key
// No key to load all config as object
// key[string]: key of the config
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
