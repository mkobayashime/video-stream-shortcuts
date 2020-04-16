'use strict';

window.onload = () => {
  let media
  const interval = window.setInterval(() => {
    media = document.getElementsByTagName('video')[0]
    if(media) {
      window.clearInterval(interval)
    }
  }, 250)

  const moveSec = 10

  const pauseResume = () => {
    if(media.paused) {
      media.play()
    }else{
      media.pause()
    }
  }

  const moveForward = () => {
    const curTime = media.currentTime
    media.currentTime = curTime + moveSec
  }

  const moveBackward = () => {
    const curTime = media.currentTime
    media.currentTime = curTime - moveSec
  }

  const toggleFullScreen = () => {
    document.getElementsByClassName("vjs-fullscreen-control")[0].click()
  }

  const toggleMute = () => {
    document.getElementsByClassName("vjs-mute-control")[0].click()
  }

  document.onkeyup = e => {
    if(media) {
      switch(e.key) {
        case 'k':
          pauseResume()
          break
        case ' ':
          pauseResume()
          break
        case 'j':
          moveBackward()
          break
        case 'l':
          moveForward()
          break
        case 'f':
          toggleFullScreen()
          break
        case 'm':
          toggleMute()
          break
      }
    }
    // console.log(e)
  }
}
