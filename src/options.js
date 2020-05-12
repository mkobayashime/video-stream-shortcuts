"use strict"

import "./style/options.sass"

window.onload = () => {
  const checkboxesSites = Array.from(
    document.getElementsByClassName("checkbox-sites")
  )
  const checkboxesKeys = Array.from(
    document.getElementsByClassName("checkbox-keys")
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
