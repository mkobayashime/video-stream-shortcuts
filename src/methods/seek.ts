"use strict"

const seek = ({
  media,
  direction,
  seekSec,
  cacheRequired = false,
}: {
  media: HTMLVideoElement
  direction: "forward" | "backward"
  seekSec: number
  /**
   * `true` to force caching the new frame
   */
  cacheRequired?: boolean
}) => {
  if (direction === "forward") {
    const curTime = media.currentTime
    media.currentTime = curTime + seekSec
    if (cacheRequired) {
      cache(media)
    }
  } else if (direction === "backward") {
    const curTime = media.currentTime
    media.currentTime = curTime - seekSec > 0 ? curTime - seekSec : 0
    if (cacheRequired) {
      cache(media)
    }
  } else {
    throw '"direction" must be either of "forward" or "backward"'
  }
}

const decimalSeek = ({
  media,
  numericKey,
  cacheRequired = true,
}: {
  media: HTMLVideoElement
  /**
   * Number key pressed. Must be between 0 and 9.
   */
  numericKey: string
  /**
   * `true` to force caching the new frame
   */
  cacheRequired?: boolean
}) => {
  const keyIndex = parseInt(numericKey)
  if (isNaN(keyIndex)) return

  media.currentTime = media.duration * (keyIndex / 10)
  if (cacheRequired) cache(media)
}

/**
 * Pause or Resume once and then undo it to load the new frame
 */
const cache = (media: HTMLVideoElement) => {
  if (media.paused) {
    media.play()
    media.pause()
  } else {
    media.pause()
    media.play()
  }
}

export { seek, decimalSeek }
