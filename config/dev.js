const EslintPlugin = require('eslint-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map', // 控制台中报错的位置和源码中位置保持一致
    devServer: {
        port: 8000,
        open: true, // 打包成功后,自动打开浏览器
        client: {
            // 当出现编译错误或警告时，在浏览器中显示全屏覆盖。
            overlay: {
                errors: true, // 报错显示
                warnings: false, // 警告不显示
            },
        },
    },
    plugins: [
        // 这个插件仅仅是把eslint集成到webpack中
        // 还需下载eslint
        new EslintPlugin({
            eslintPath: 'eslint', // 指定使用什么对代码校验
            extensions: ['js', 'jsx', 'ts', 'tsx'], // 对哪些模块的代码进行校验
            exclude: ['node_modules'], // 不对node_modules中的代码进行校验，可以提升打包速度
            fix: false, // 关闭自动修复功能，一般情况下都是关闭的
            formatter: 'stylish',
        }),
    ],
    // 持久化缓存
    cache: {
        type: 'filesystem', // 开启持久缓存
        cacheDirectory: path.resolve(__dirname, '../', 'webpack_cache'), // 指定缓存目录
        buildDependencies: {
            config: [__filename], // 添加配置文件作为构建依赖
        },
        name: 'development', // 使用固定的缓存名，避免与其他环境冲突
    },
};
