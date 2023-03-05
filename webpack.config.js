const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');



module.exports = (env) => {
    return {
        entry: "./index.ts",
        output: {
            filename: 'bundle.js',
            path: path.join(__dirname, 'assets')
        },
        module: {
            rules: [
                {
                    test: /.ts$/,
                    use: ['ts-loader']
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'canvas画布',
                filename: 'index.html',
                template: path.join(__dirname, "public/index.html")
            })
        ],
        devtool: "inline-source-map",
        devServer: {
            port: 9000,
            hot: true,
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        mode: 'development'
    };
}