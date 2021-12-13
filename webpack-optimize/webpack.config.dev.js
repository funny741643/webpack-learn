const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.config.base");

const smp = new SpeedMeasurePlugin();
const webpack = require("webpack");

const config = merge(baseWebpackConfig, {
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    // ...
});

module.exports = smp.wrap(config);
