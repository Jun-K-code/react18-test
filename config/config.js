/** @type {import('webpack'.Configuration)} */ // 这个是ts的语法，表示下面的配置是webpack的配置，就会有语法提示
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ProvidePlugin } = require('webpack');

// console.log(
//     "path.resolve(__dirname, '../', 'src/index.tsx')",
//     path.resolve(__dirname, '../', 'src/index.tsx')
// );
// console.log("path.resolve(__dirname, '../', 'src')", path.resolve(__dirname, '../', 'src'));
// console.log("path.resolve(__dirname, '../')", path.resolve(__dirname, '../'));

module.exports = {
    // 项目入口文件
    // entry: './src/index.tsx', // 相对路径
    // entry: path.resolve(__dirname, '../', 'src/index.tsx'), // 绝对路径
    entry: {
        chunk: ['react', 'react-dom/client'], // 抽离第三方包
        // 这里的bundle对应的就是output内filename的name的部分
        bundle: {
            // import是用来指定业务代码的入口
            // __dirname代表当前目录的绝对路径
            // 部署到线上的时候，要用绝对路径，因为相对路径是会变换的
            import: path.resolve(__dirname, '../', 'src/index.tsx'), // 绝对路径
            dependOn: 'chunk', // 依赖上面的chunk
        },
    },
    // 出口必须指定绝对路径
    output: {
        // contenthash是针对单个模块进行hash
        // 如果有多个模块，但只变化了一个模块的代码，那contenthash就只更新改变了代码的模块，其它模块使用缓存，不会全部模块更新。
        // contenthash也是缓存的一种方式
        filename: 'js/[name].[contenthash:8].js', // [name]是占位符，把入口名替换掉[name]
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
                // use: [
                //     'thread-loader',
                //     {
                //         loader: 'babel-loader',
                //         // @babel/preset-env是一个预设(预设是插件的集合), 它可以把ES6中的大部分语法, 转化成ES5; 它并不是转化所有语法, 仅仅是大部分, 个别语法转化不了, 需要单独安装插件.
                //         // 如果要使用@babel/preset-env, 需要依赖@babel/core, 它是核心包
                //         // .jsx文件需要@babel/preset-react进行预设处理
                //         options: { presets: ['@babel/preset-react', '@babel/preset-env'] },
                //     },
                // ],
                use: {
                    loader: 'babel-loader',
                    // @babel/preset-env是一个预设(预设是插件的集合), 它可以把ES6中的大部分语法, 转化成ES5; 它并不是转化所有语法, 仅仅是大部分, 个别语法转化不了, 需要单独安装插件.
                    // 如果要使用@babel/preset-env, 需要依赖@babel/core, 它是核心包
                    // .jsx文件需要@babel/preset-react进行预设处理
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'], // 对于antd的引入部分，你可以使用babel-plugin-import来实现按需加载。你需要安装这个插件，然后在babel-loader的options中添加它：
                        plugins: [['import', { libraryName: 'antd', style: 'css' }]],
                    },
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
            {
                test: /\.(png|jpg|svg|gif|jpeg|webp)$/,
                type: 'asset/resource', // 类似webpack4使用file-loader实现
                parser: {
                    dataUrlCondition: {
                        maxSize: 30 * 1024, // 小于30kb的图片会被base64处理
                    },
                },
                generator: {
                    // 将图片文件输出到 img 目录中
                    // 将图片文件命名 [contenthash:8][ext]
                    // [contenthash:8]: contenthash值取8位
                    // [ext]: 使用之前的文件扩展名
                    filename: 'img/[name].[contenthash:8][ext]',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../', 'public/index.html'),
            inject: 'body', // 'body'所有 javascript 资源都将放置在 body 元素的底部。
            title: 'react18', // 用于生成的 HTML 文档的标题
            favicon: path.resolve(__dirname, '../', 'public/favicon.ico'), // 将给定的图标路径添加到输出 HTML
            filename: 'index.html', // 要写入 HTML 的文件。默认为index.html
        }),
        // ProvidePlugin自动加载模块，而不必在任何地方导入或要求它们。
        new ProvidePlugin({
            React: path.resolve(__dirname, '../', 'node_modules/react/index.js'),
        }),
    ],
    resolve: {
        alias: {
            // 配置解析src路径
            // '@': path.resolve(__dirname, '../', 'src'),
            src: path.resolve(__dirname, '../', 'src'),
        },
        // 配置允许省略后缀
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    optimization: {
        splitChunks: {
            chunks: 'all', // 这表明将选择哪些 chunk 进行优化。当提供一个字符串，有效值为 all，async 和 initial。设置为 all 可能特别强大，因为这意味着 chunk 可以在异步和非异步 chunk 之间共享。但是，这也可能导致很多不必要的请求。建议只选择 initial 或 async。默认为 async。

            name: false, // 拆分 chunk 的名称。设为 false 将保持 chunk 的相同名称，因此不会不必要地更改名称。这是生产环境下构建的建议值。

            // 缓存组
            cacheGroups: {
                // 打包第三方库
                // 这个缓存组用于打包React和Redux这些第三方库的基础代码。它使用了一个正则表达式来匹配模块的上下文路径，如果路径中包含'react'或'redux'，则将其归入该缓存组。这个缓存组的chunks配置为'initial'，表示仅包括初始加载的chunk。优先级为10，表示这个缓存组的优先级较高。
                reactBase: {
                    name: 'reactBase',
                    test: (module) => {
                        return /react|redux/.test(module.context);
                    },
                    chunks: 'initial',
                    priority: 10, // 优先级最高
                },
                // 这个缓存组用于打包Lodash这个第三方库的基础代码。它使用了一个正则表达式来匹配模块的上下文路径，如果路径中包含'lodash'，则将其归入该缓存组。同样，它的chunks配置为'initial'，优先级为9。
                utilBase: {
                    name: 'utilBase',
                    test: (module) => {
                        return /lodash/.test(module.context);
                    },
                    chunks: 'initial',
                    priority: 9,
                },
                // 这个缓存组用于打包Echarts这个第三方库的基础代码。它使用了一个正则表达式来匹配模块的上下文路径，如果路径中包含'echarts'，则将其归入该缓存组。同样，它的chunks配置为'initial'，优先级为8。
                uiBase: {
                    name: 'chartBase',
                    test: (module) => {
                        return /echarts/.test(module.context);
                    },
                    chunks: 'initial',
                    priority: 8,
                },
                // 这个缓存组用于打包剩余的公共代码。它设置了最小引用次数为2，即只有被引用两次及以上的模块才会被打包。名称设置为'common'，表示分离出的包的名称为'common'。chunks配置为'all'，表示将包含所有类型的chunk。优先级为2。
                // 优先级最低的缓存组将在所有其他缓存组都无法匹配时才应用。
                common: {
                    // 打包其余的的公共代码
                    minChunks: 2, // 引入两次及以上被打包
                    name: 'common', // 分离包的名字
                    chunks: 'all',
                    priority: 2, // 优先级最低
                },
            },
        },
    },
};
