"use strict"

const createIndicator = ({ wrapper, type, media, text }) => {
  if (!type) {
    throw '"type" must not be undefined'
  }

  const indicatorOuter = document.createElement("div")
  indicatorOuter.className = "indicatorOuter"

  const indicatorInner = document.createElement("div")
  indicatorInner.className = "indicatorInner"
  indicatorOuter.appendChild(indicatorInner)

  if (type === "togglePause") {
    if (!media) {
      throw '"media" must not be undefined'
    }
    if (media.paused) {
      const indicatorIcon = document.createElement("img")
      // eslint-disable-next-line no-undef
      indicatorIcon.src = chrome.extension.getURL("svg/pause.svg")
      indicatorInner.appendChild(indicatorIcon)
    } else {
      const indicatorIcon = document.createElement("img")
      // eslint-disable-next-line no-undef
      indicatorIcon.src = chrome.extension.getURL("svg/play_arrow.svg")
      indicatorInner.appendChild(indicatorIcon)
    }
  } else if (type === "seekForward") {
    const indicatorIcon = document.createElement("img")
    // eslint-disable-next-line no-undef
    indicatorIcon.src = chrome.extension.getURL("svg/forward_10.svg")
    indicatorInner.appendChild(indicatorIcon)
  } else if (type === "seekBackward") {
    const indicatorIcon = document.createElement("img")
    // eslint-disable-next-line no-undef
    indicatorIcon.src = chrome.extension.getURL("svg/replay_10.svg")
    indicatorInner.appendChild(indicatorIcon)
  } else if (type === "text") {
    const indicatorText = document.createElement("p")
    indicatorText.innerHTML = text
    indicatorInner.appendChild(indicatorText)
  }

  wrapper.appendChild(indicatorOuter)

  window.setTimeout(() => {
    indicatorOuter.remove()
  }, 600)
}

export default createIndicator
