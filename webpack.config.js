const historyApiFallback = require('connect-history-api-fallback');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    mode: 'development',
    entry: './client/src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test:/.jsx?$/,
                exclude:/node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './client/src/index.html'
        })
    ],
    devServer: {
        host: 'localhost',
        port: 8080,
        hot: true,
        historyApiFallback: true,
        proxy: [
            {
              context: ['/api'],
              target: 'http://localhost:3000',
              secure: false,
              changeOrigin: true,
              pathRewrite: {'^/api' : ''}
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx']
    }
}