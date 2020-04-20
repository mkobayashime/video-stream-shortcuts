'use strict';

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
  const moveSec = 10

  const pauseResume = () => {
    if(media.paused) {
      media.play()
    }else{
      media.pause()
    }
  }

  // Pause or Resume once and then undo it to load the new frame
  const cache = () => {
    if(media.paused) {
      media.play()
      media.pause()
    }else{
      media.pause()
      media.play()
    }
  }
  
  const moveForward = () => {
    const curTime = media.currentTime
    media.currentTime = curTime + moveSec
    cache()
  }
  
  const moveBackward = () => {
    const curTime = media.currentTime
    media.currentTime = curTime - moveSec || 0
    cache()
  }

  document.onkeyup = e => {
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
    }
    // console.log(e)
  }
}
