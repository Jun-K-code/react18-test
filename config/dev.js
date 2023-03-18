module.exports = {
    mode: 'development',
    devtool: 'eval-source-map', // 控制台中报错的位置和源码中位置保持一致
    devServer: {
        port: 8000,
        open: true, // 打包成功后,自动打开浏览器
    },
};
