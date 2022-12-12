"use strict"

const CopyWebpackPlugin = require("copy-webpack-plugin")
const glob = require("glob")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require("path")
const ZipWebpackPlugin = require("zip-webpack-plugin")

const isDev = process.env.WEBPACK_ENV !== "production"

const version = require("./package.json").version

const contentScriptEntries = glob.sync("./src/contentScripts/*.ts")
const otherEntries = glob.sync("./src/*.ts")
const entries = [...contentScriptEntries, ...otherEntries].reduce(
  (acc, cur) => {
    const key = path.basename(cur, ".ts")
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
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.sass$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "**/*",
          context: "public",
        },
      ],
    }),
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
