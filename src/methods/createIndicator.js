"use strict"

import "../style/indicator.sass"

// type[string]: "icon" or "text"
// id[string]: id of icon
// text[string]: string to be displayed in "text" type
// wrapper[DOM]: Wrapper sized the same as the video
// media[DOM]: Video to be handled
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
          indicatorIcon.src = chrome.extension.getURL("svg/pause.svg")
        } else {
          indicatorIcon.src = chrome.extension.getURL("svg/play_arrow.svg")
        }
        break
      }
      case "seekForward": {
        indicatorIcon.src = chrome.extension.getURL("svg/forward.svg")
        break
      }
      case "seekBackward": {
        indicatorIcon.src = chrome.extension.getURL("svg/replay.svg")
        break
      }
      case "mute": {
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

  // Remove the DOM after it disappeared with CSS Animation
  window.setTimeout(() => {
    indicatorOuter.remove()
  }, 600)
}

export default createIndicator
