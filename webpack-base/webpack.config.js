const path = require("path");

// 自动引入js或css文件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 自动清空打包目录
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
/**
 * 分离样式文件，对于style-loader其将样式通过style标签形式添加到页面上,
 * 但更多时候，我们都希望可以通过css文件的形式引入到页面上
 */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 区分不同环境
console.log("process.env.NODE_ENV=", process.env.NODE_ENV);

const config = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist"),
    },
    devtool: 'source-map',
    // devServer: {
    //     // 静态文件目录
    //     static: path.resolve(__dirname, "public"),
    //     // 是否启动压缩 gzip
    //     compress: true,
    //     // 端口号
    //     port: 8080,
    //     // 是否自动打开浏览器
    //     open: false,
    // },
    module: {
        rules: [
            {
                test: /\.js$/i,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                        },
                    },
                ],
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    // "style-loader",
                    MiniCssExtractPlugin.loader,
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
                // use: [{
                //     loader: 'file-loader',
                //     options: {
                //         name: '[name][hash:8].[ext]'
                //     }
                // }, {
                //     loader: 'url-loader',
                //     options: {
                //         name: '[name][hash:8].[ext]',
                //         limit: 50 * 1024
                //     }
                // }]
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[hash:8].css",
        }),
    ],
};

module.exports = (env, argv) => {
    // 打印mode(模式)值
    console.log("argv.mode=", argv.mode);
    // 通过不同的模式来修改对应的config配置
    return config;
};
