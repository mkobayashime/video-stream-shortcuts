"use strict"

const loadConfig = (key) => {
  return new Promise((resolve) => {
    if (!key) {
      // eslint-disable-next-line no-undef
      chrome.storage.sync.get((result) => {
        resolve(result)
      })
    } else {
      // eslint-disable-next-line no-undef
      chrome.storage.sync.get([key], (result) => {
        resolve(result[key])
      })
    }
  })
}

export default loadConfig
