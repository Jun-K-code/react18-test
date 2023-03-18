const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    module: {
        // loader是加载器，在webpack处理某些模块之前，先使用loader进行处理
        rules: [
            {
                // 当webpack工作时，遇到了以.css结尾的模块
                // 使用css-loader加载解析返回内容交给MiniCssExtractPlugin内的loader来处理
                // MiniCssExtractPlugin.loader是单独抽离css
                test: /\.css?$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'], // 解析CSS文件
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
        }),
    ],
};
