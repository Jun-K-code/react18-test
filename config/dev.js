const EslintPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map', // 控制台中报错的位置和源码中位置保持一致
    devServer: {
        port: 8000,
        open: true, // 打包成功后,自动打开浏览器
        client: {
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
};
