"use strict"

const merge = require("webpack-merge")

const common = require("./webpack.common.js")
const PATHS = require("./paths")

// Merge webpack configuration files
const config = merge(common, {
  entry: {
    background: PATHS.src + "/background.js",
    options: PATHS.src + "/options/options.js",
    msStream: PATHS.src + "/contentScripts/msStream.js",
    primeVideo: PATHS.src + "/contentScripts/primeVideo.js",
    ted: PATHS.src + "/contentScripts/ted.js",
  },
})

module.exports = config
