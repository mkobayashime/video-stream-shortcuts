"use strict"

const createIndicator = ({ type, id, text, wrapper, media }) => {
  if (!wrapper) {
    throw '"wrapper" must not be undefined'
  }
  if (!type) {
    throw '"type" must not be undefined'
  }

  const indicatorOuter = document.createElement("div")
  indicatorOuter.className = "indicatorOuter"

  const indicatorInner = document.createElement("div")
  indicatorInner.className = "indicatorInner"
  indicatorOuter.appendChild(indicatorInner)

  if (type === "icon") {
    if (!id) {
      throw '"id" must not be undefined'
    }
    const indicatorIcon = document.createElement("img")
    switch (id) {
      case "togglePause": {
        if (!media) {
          throw '"media" must not be undefined'
        }
        if (media.paused) {
          // eslint-disable-next-line no-undef
          indicatorIcon.src = chrome.extension.getURL("svg/pause.svg")
        } else {
          // eslint-disable-next-line no-undef
          indicatorIcon.src = chrome.extension.getURL("svg/play_arrow.svg")
        }
        break
      }
      case "seekForward": {
        // eslint-disable-next-line no-undef
        indicatorIcon.src = chrome.extension.getURL("svg/forward_10.svg")
        break
      }
      case "seekBackward": {
        // eslint-disable-next-line no-undef
        indicatorIcon.src = chrome.extension.getURL("svg/replay_10.svg")
        break
      }
      case "mute": {
        // eslint-disable-next-line no-undef
        indicatorIcon.src = chrome.extension.getURL("svg/volume_off.svg")
        break
      }
    }
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
