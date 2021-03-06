const path = require("path");

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  devtool: "inline-source-map",
  output: {
    filename: "bundle.js"
  },
  watch: true,
  devServer: {
    contentBase: "./src",
    compress: true,
    port: 9000
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: ["babel-loader"]
    }]
  }
};