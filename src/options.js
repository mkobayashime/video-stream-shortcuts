"use strict"

import "./style/options.sass"

window.onload = () => {
  const checkboxesSites = Array.from(
    document.getElementsByClassName("checkbox-sites")
  )
  const checkboxesKeys = Array.from(
    document.getElementsByClassName("checkbox-keys")
  )
  const speedSelectors = Array.from(
    document.getElementsByClassName("speed-selector")
  )

  // Load sites/keys config and apply it to the UI checkbox state
  const applySitesAndKeysConfig = (dom) => {
    const key = dom.id
    chrome.storage.sync.get([key], (result) => {
      if (result[key] === false) {
        dom.checked = false
      }
    })
  }
  for (const dom of checkboxesSites) {
    applySitesAndKeysConfig(dom)
  }
  for (const dom of checkboxesKeys) {
    applySitesAndKeysConfig(dom)
  }

  // Save sites/keys config to chrome.storage when checkboxes are clicked
  const bindSitesAndKeysConfig = (dom) => {
    const key = dom.id
    dom.addEventListener("change", (event) => {
      chrome.storage.sync.set({ [key]: event.srcElement.checked })
    })
  }
  for (const dom of checkboxesSites) {
    bindSitesAndKeysConfig(dom)
  }
  for (const dom of checkboxesKeys) {
    bindSitesAndKeysConfig(dom)
  }

  // Load default playback speeds config and apply it to the UI
  const applySpeedsConfig = (dom) => {
    const key = dom.id
    chrome.storage.sync.get([key], (result) => {
      if (result[key] !== undefined) {
        dom.value = result[key]
      }
    })
  }
  for (const dom of speedSelectors) {
    applySpeedsConfig(dom)
  }

  // Save default playback speeds config to chrome.storage when new value is selected
  const bindSpeedsConfig = (dom) => {
    const key = dom.id
    dom.addEventListener("change", (event) => {
      chrome.storage.sync.set({ [key]: Number(event.srcElement.value) })
    })
  }
  for (const dom of speedSelectors) {
    bindSpeedsConfig(dom)
  }

  // Load seek-sec config and apply it to the UI input
  const seekSecInput = document.getElementById("seek-sec")
  chrome.storage.sync.get(["seek-sec"], (result) => {
    seekSecInput.value = result["seek-sec"]
  })
  // Save seek-sec config to chrome.storage when the user typed a new value
  seekSecInput.addEventListener("change", (event) => {
    chrome.storage.sync.set({ "seek-sec": Number(event.srcElement.value) })
  })
}
