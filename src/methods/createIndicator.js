"use strict"

import "../style/indicator.sass"

/**
 * @typedef {Object} Props
 * @property {"icon" | "text"} type
 * @property {"togglePause" | "seekForward" | "seekBackward" | "mute"} id - Id of icon
 * @property {string} text - String to be displayed in "text" type
 * @property {HTMLElement} wrapper - Wrapper element sized the same as the video
 * @property {HTMLVideoElement} media - Video element to be handled
 */

/**
 * @param {Props}
 */
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
          indicatorIcon.src = chrome.runtime.getURL("svg/pause.svg")
        } else {
          indicatorIcon.src = chrome.runtime.getURL("svg/play_arrow.svg")
        }
        break
      }
      case "seekForward": {
        indicatorIcon.src = chrome.runtime.getURL("svg/forward.svg")
        break
      }
      case "seekBackward": {
        indicatorIcon.src = chrome.runtime.getURL("svg/replay.svg")
        break
      }
      case "mute": {
        indicatorIcon.src = chrome.runtime.getURL("svg/volume_off.svg")
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
