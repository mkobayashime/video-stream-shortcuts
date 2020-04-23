'use strict'

const toggleFullsceen = (media, document) => {
  if(!document.fullscreenElement) {
    media.requestFullscreen()
  }else{
    document.exitFullscreen()
  }
}

export default toggleFullsceen
