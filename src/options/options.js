"use strict"

import "./options.sass"

window.onload = () => {
  const checkboxesSites = Array.from(
    document.getElementsByClassName("checkbox-sites")
  )
  const checkboxesKeys = Array.from(
    document.getElementsByClassName("checkbox-keys")
  )

  const applySiteAndKeyConfig = (dom) => {
    const key = dom.id
    // eslint-disable-next-line no-undef
    chrome.storage.sync.get([key], (result) => {
      if (result[key] === false) {
        dom.checked = false
      }
    })
  }

  checkboxesSites.forEach((dom) => {
    applySiteAndKeyConfig(dom)
  })
  checkboxesKeys.forEach((dom) => {
    applySiteAndKeyConfig(dom)
  })

  const watchSitesAndKeysConfig = (dom) => {
    const key = dom.id
    dom.addEventListener("change", (event) => {
      // eslint-disable-next-line no-undef
      chrome.storage.sync.set({ [key]: event.srcElement.checked })
    })
  }

  checkboxesSites.forEach((dom) => {
    watchSitesAndKeysConfig(dom)
  })
  checkboxesKeys.forEach((dom) => {
    watchSitesAndKeysConfig(dom)
  })

  const seekSecInput = document.getElementById("seek-sec")
  // eslint-disable-next-line no-undef
  chrome.storage.sync.get(["seek-sec"], (result) => {
    seekSecInput.value = result["seek-sec"]
  })
  seekSecInput.addEventListener("change", (event) => {
    // eslint-disable-next-line no-undef
    chrome.storage.sync.set({ "seek-sec": Number(event.srcElement.value) })
  })
}
