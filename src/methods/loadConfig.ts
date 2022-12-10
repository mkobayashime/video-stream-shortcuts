"use strict"

/**
 * Load config in `chrome.storage` with key
 * @param {string} key - Key of the config to get. `undefined` to get all the configs.
 */
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
