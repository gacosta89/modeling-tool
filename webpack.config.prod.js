'use strict'; // eslint-disable-line strict

var path = require('path');
var webpack = require('webpack');

module.exports = {
    target: 'web',
    devtool: 'source-map',
    context: path.join(__dirname, 'source'),
    resolve: {
        modules: [
            'node_modules',
            path.join(__dirname, 'source'),
        ]
    },
    entry: [
        'babel-polyfill',
        './client/index'
    ],
    output: {
        path: path.join(__dirname, 'build/client'),
        filename: 'index.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compressor: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
            },
        }),
    ],
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: path.join(__dirname, 'source'),
        }, {
            test: /\.(png|jpg|gif|GIF|ttf|woff|eot|svg|css)$/,
            loader: 'file-loader?name=assets/[name].[ext]&publicPath=assets/&outputPath=assets/',
        }, {
            test: /\.json$/,
            loader: 'json-loader',
        }]
    }
};
