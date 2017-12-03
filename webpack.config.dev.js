'use strict'; // eslint-disable-line strict

var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    target: 'web',
    context: path.resolve(__dirname),
    resolve: {
        modules: [
            'node_modules',
            path.join(__dirname, 'source'),
        ]
    },
    entry: [
        'babel-polyfill',
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './source/client/index',
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'index.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development'),
            },
        }),
    ],
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: [
                path.join(__dirname, 'source'),
            ]
        }, {
            test: /\.(png|jpg|gif|GIF|ttf|woff|eot|svg|css)$/,
            loader: 'file-loader?name=assets/[name].[ext]'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }]
    }
};
