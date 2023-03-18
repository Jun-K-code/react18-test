const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ProvidePlugin } = require('webpack');

module.exports = {
    // 项目入口文件
    // entry: './src/index.tsx', // 相对路径
    // entry: path.resolve(__dirname, '../', 'src/index.tsx'), // 绝对路径
    entry: {
        chunk: ['react', 'react-dom/client'], // 抽离第三方包
        // 这里的bundle对应的就是output内filename的name的部分
        bundle: {
            // import是用来指定业务代码的入口
            import: path.resolve(__dirname, '../', 'src/index.tsx'), // 绝对路径
            dependOn: 'chunk', // 依赖上面的chunk
        },
    },
    // 出口必须指定绝对路径
    output: {
        filename: 'js/[name].[hash].js',
        path: path.resolve(__dirname, '../', 'build'), // 把文件放在当前项目的dist文件夹下
        clean: true,
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.css', '.json'],
    },
    module: {
        // loader是加载器，在webpack处理某些模块之前，先使用loader进行处理
        rules: [
            {
                // 当webpack工作时,遇到了以.tsx结尾给模块, 先使用babel-loader进行加载
                // 当loader加载完后, 还需要使用一些@babel/* 进行语法转化, 转化成ES5代码
                test: /\.(js|ts|tsx)?$/,
                use: {
                    loader: 'babel-loader',
                    // @babel/preset-env是一个预设(预设是插件的集合), 它可以把ES6中的大部分语法, 转化成ES5; 它并不是转化所有语法, 仅仅是大部分, 个别语法转化不了, 需要单独安装插件.
                    // 如果要使用@babel/preset-env, 需要依赖@babel/core, 它是核心包
                    // .jsx文件需要@babel/preset-react进行预设处理
                    options: { presets: ['@babel/preset-react', '@babel/preset-env'] },
                },
                // exclude: /node_modules/ 让node_modules中的代码不参与打包
                exclude: /node_modules/,
            },
            {
                test: /\.(ts|tsx)?$/,
                use: 'ts-loader', // 解析TS文件
                exclude: /node_modules/,
            },
            {
                // 当webpack工作时，遇到了以.css或.scss结尾的模块
                // 使用sass-loader加载解析返回内容交给css-loader来处理
                // 使用css-loader加载解析返回内容交给style-loader来处理
                // style-loader可以把css-loader处理后结果，以操作DOM的形式，插入到head标签中，就是内部样式
                test: /\.(css|scss)?$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../', 'public/index.html'),
            inject: 'body',
            title: 'react18',
            favicon: path.resolve(__dirname, '../', 'public/favicon.ico'),
            filename: 'index.html',
        }),
        new ProvidePlugin({
            React: path.resolve(__dirname, '../', 'node_modules/react/index.js'),
        }),
    ],
};
