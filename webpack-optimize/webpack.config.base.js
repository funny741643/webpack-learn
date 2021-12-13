const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// css压缩
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// css引入
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// js压缩
const TerserPlugin = require("terser-webpack-plugin");
// 提取css并清除用不到的css
const PurgecssWebpackPlugin = require("purgecss-webpack-plugin");
// 文件匹配模式
const glob = require("glob");

function resolve(dir) {
    return path.join(__dirname, dir);
}

const PATHS = {
    src: resolve("src"),
};

const config = {
    entry: "./src/index.js",
    output: {
        filename: "[name].[hash:4].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
    },
    externals: {
        jquery: "JQuery",
    },
    resolve: {
        // 创建import 和 require的别名，用来简化模块引用
        alias: {
            "@": resolve("src"),
            "~": resolve("src"),
            components: resolve("src/components"),
        },
        // 设置模块引用扩展名
        extensions: ["ts", "js", "..."],
        // 告诉webpack解析模块时应该搜索的目录
        modules: [resolve("src"), "node_modules", resolve("loader")],
    },
    module: {
        noParse: /jquery/,
        rules: [
            {
                test: /\.js[x]?$/,
                use: [
                    {
                        // 开启多线程
                        loader: "thread-loader",
                        options: {
                            worker: 3,
                        },
                    },
                    {
                        loader: "babel-loader",
                        options: {
                            // 开启babel缓存
                            cacheDirectory: true,
                        },
                    },
                ],
                include: [path.resolve(__dirname, "src")],
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    "style-loader",
                    // MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                type: "asset",
                generator: {
                    filename: "[name][hash:8][ext]",
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 50 * 1024,
                    },
                },
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: "async", // 有效值为 `all`，`async` 和 `initial`
            minSize: 20000, // 生成 chunk 的最小体积（≈ 20kb)
            minRemainingSize: 0, // 确保拆分后剩余的最小 chunk 体积超过限制来避免大小为零的模块
            minChunks: 1, // 拆分前必须共享模块的最小 chunks 数。
            maxAsyncRequests: 30, // 最大的按需(异步)加载次数
            maxInitialRequests: 30, // 打包后的入口文件加载时，还能同时加载js文件的数量（包括入口文件）
            enforceSizeThreshold: 50000,
            cacheGroups: {
                // 配置提取模块的方案
                defaultVendors: {
                    test: /[\/]node_modules[\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin({})],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[hash:8].css",
        }),
        new PurgecssWebpackPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "disabled",
            generateStatsFile: true,
        }),
    ],
};

module.exports = config;
