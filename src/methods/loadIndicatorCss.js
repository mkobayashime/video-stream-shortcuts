"use strict"

const loadIndicatorCss = () => {
  const linkElm = document.createElement("link")
  linkElm.rel = "stylesheet"
  // eslint-disable-next-line no-undef
  linkElm.href = chrome.extension.getURL("indicator.css")
  document.head.appendChild(linkElm)
}

export default loadIndicatorCss
