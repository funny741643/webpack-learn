const path = require("path");
const Plugin = require("./src/plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve("./src/loader2.js"),
          },
          {
            loader: path.resolve("./src/loader1.js"),
          },
        ],
      },
    ],
  },
  plugins: [new Plugin()],
};
