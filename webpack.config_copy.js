const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // development 开发模式打包 内存打包
    // production 生成模式打包 硬盘打包
    mode: 'development',
    // 项目入口文件
    // entry: './src/index.tsx', // 相对路径
    entry: path.resolve(__dirname, 'src/index.tsx'), // 绝对路径
    // 出口必须指定绝对路径
    output: {
        filename: 'js/bundle.[hash].js',
        path: path.resolve(__dirname, 'dist'), // 把文件放在当前项目的dist文件夹下
        clean: true,
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.css', '.json'],
    },
    module: {
        // loader是加载器
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['@babel/preset-react', '@babel/preset-env'] },
                },
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader', // 解析TS文件
                exclude: /node_modules/,
            },
            {
                test: /\.css?$/,
                use: ['style-loader', 'css-loader'], // 解析CSS文件
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: 'body',
            title: 'react18',
            favicon: path.resolve(__dirname, './public/favicon.ico'),
            filename: 'index.html',
        }),
    ],
    // 配置本地开发服务器
    devServer: {
        port: 8000,
    },
};
