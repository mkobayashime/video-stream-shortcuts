'use strict';

import togglePause from '../methods/togglePause'
import seek from '../methods/seek'
import isTyping from '../methods/isTyping'

window.onload = () => {
  const body = document.getElementsByTagName("body")[0]
  
  const observer = new MutationObserver(() => {
    if(body.style.overflow === "hidden") {
      getVideo()
    }
  })

  observer.observe(body, {
    attributes: true
  })
}

const getVideo = () => {
  const promise = new Promise(resolve => {
    const interval = window.setInterval(() => {
      const media = document.getElementsByTagName('video')[0]
      if(media) {
        window.clearInterval(interval)
        resolve(media)
      }
    }, 250)
  })

  promise.then(media => {
    setShortcuts(media)
  })
}

const setShortcuts = media => {
  document.onkeyup = e => {
    if(!isTyping(document)) {
      switch(e.key) {
        case 'k':
          togglePause(media)
          break
        case ' ':
          togglePause(media)
          break
        case 'j':
          seek({
            media: media,
            direction: 'backward',
            cacheRequired: true
          })
          break
        case 'l':
          seek({
            media: media,
            direction: 'forward',
            cacheRequired: true
          })
          break
      }
    }
  }
}
