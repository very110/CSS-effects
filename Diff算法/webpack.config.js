const path = require('path');
const html = require('html-webpack-plugin');


module.exports = {
    // 入口
    entry: "./src/main.js",
    // 输出
    output: {
        path: undefined
    },
    // 加载器
    module: {
        rules: [],
    },
    // 插件
    plugins: [
        new html({
            template: path.resolve(__dirname, './public/index.html')
        })
    ],
    // 模式
    mode: "development",
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,

    }
};
