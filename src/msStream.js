'use strict';

chrome.runtime.onMessage.addListener(message => {
  if(message.type === "msStreamUpdated") {
    getVideo()
  }
})

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
