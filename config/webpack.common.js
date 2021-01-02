"use strict"

const path = require("path")
const glob = require("glob")

const SizePlugin = require("size-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const contentScriptEntries = glob.sync("./src/contentScripts/*.js")
const otherEntries = glob.sync("./src/*.js")

const entries = contentScriptEntries.concat(otherEntries).reduce((acc, cur) => {
  const key = path.basename(cur, ".js")
  acc[key] = cur
  return acc
}, {})

const common = {
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "[name].js",
  },
  entry: entries,
  stats: {
    all: false,
    errors: true,
    builtAt: true,
  },
  module: {
    rules: [
      // Help webpack in understanding CSS files imported in .js files
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.sass$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      // Check for images imported in .js files and
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
    // Print file sizes
    new SizePlugin(),
    // Copy static assets from `public` folder to `build` folder
    new CopyWebpackPlugin([
      {
        from: "**/*",
        context: "public",
      },
    ]),
    // Extract CSS into separate files
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
}

module.exports = common
