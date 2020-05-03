"use strict"

import "./options.sass"

window.onload = () => {
  const checkboxesSites = Array.from(
    document.getElementsByClassName("checkbox-sites")
  )
  const checkboxesKeys = Array.from(
    document.getElementsByClassName("checkbox-keys")
  )

  const applySitesAndKeysConfig = (dom) => {
    const key = dom.id
    chrome.storage.sync.get([key], (result) => {
      if (result[key] === false) {
        dom.checked = false
      }
    })
  }

  checkboxesSites.forEach((dom) => {
    applySitesAndKeysConfig(dom)
  })
  checkboxesKeys.forEach((dom) => {
    applySitesAndKeysConfig(dom)
  })

  const bindSitesAndKeysConfig = (dom) => {
    const key = dom.id
    dom.addEventListener("change", (event) => {
      chrome.storage.sync.set({ [key]: event.srcElement.checked })
    })
  }

  checkboxesSites.forEach((dom) => {
    bindSitesAndKeysConfig(dom)
  })
  checkboxesKeys.forEach((dom) => {
    bindSitesAndKeysConfig(dom)
  })

  const seekSecInput = document.getElementById("seek-sec")
  chrome.storage.sync.get(["seek-sec"], (result) => {
    seekSecInput.value = result["seek-sec"]
  })
  seekSecInput.addEventListener("change", (event) => {
    chrome.storage.sync.set({ "seek-sec": Number(event.srcElement.value) })
  })
}
