"use strict"

const path = require("path")
const merge = require("webpack-merge")

const common = require("./webpack.common.js")

const ZipPlugin = require("zip-webpack-plugin")

const version = require("../package.json").version

// Merge webpack configuration files
const config = merge(common, {
  plugins: [
    new ZipPlugin({
      path: path.resolve(__dirname, "../build"),
      filename: `${version}`,
    }),
  ],
})

module.exports = config
