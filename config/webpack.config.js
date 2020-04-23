"use strict"

const merge = require("webpack-merge")

const common = require("./webpack.common.js")
const PATHS = require("./paths")

// Merge webpack configuration files
const config = merge(common, {
  entry: {
    background: PATHS.src + "/background.js",
    msStream: PATHS.src + "/contentScripts/msStream.js",
    primeVideo: PATHS.src + "/contentScripts/primeVideo.js",
    ted: PATHS.src + "/contentScripts/ted.js",
    popup: PATHS.src + "/popup.js",
  },
})

module.exports = config
