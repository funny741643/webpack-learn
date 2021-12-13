const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.config.base");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const config = merge(baseWebpackConfig, {
    mode: "production",
    devtool: "source-map",
    performance: {
        hints: "warning", // "error" 或者 false 都是有效值
        maxEntrypointSize: 600000,
        maxAssetSize: 300000,
    },
});

module.exports = smp.wrap(config);
