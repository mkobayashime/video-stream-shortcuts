"use strict"

const path = require("path")
const glob = require("glob")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ZipWebpackPlugin = require("zip-webpack-plugin")

const isDev = process.env.WEBPACK_ENV !== "production"

const version = require("./package.json").version

const contentScriptEntries = glob.sync("./src/contentScripts/*.js")
const otherEntries = glob.sync("./src/*.js")
const entries = [...contentScriptEntries, ...otherEntries].reduce(
  (acc, cur) => {
    const key = path.basename(cur, ".js")
    acc[key] = cur
    return acc
  },
  {}
)

/** @type {import('webpack').Configuration} */
const config = {
  mode: isDev ? "development" : "production",
  entry: entries,
  output: {
    path: path.resolve("build"),
    filename: "[name].js",
  },
  devtool: isDev ? "source-map" : false,
  stats: {
    all: false,
    errors: true,
    builtAt: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.sass$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
              name: "[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: "**/*",
        context: "public",
      },
    ]),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    ...(isDev
      ? []
      : [
          new ZipWebpackPlugin({
            filename: version,
          }),
        ]),
  ],
}

module.exports = config
