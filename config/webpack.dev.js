"use strict"

const merge = require("webpack-merge")

const common = require("./webpack.common.js")

// Merge webpack configuration files
const config = merge(common, {
  devtool: "source-map",
})

module.exports = config
