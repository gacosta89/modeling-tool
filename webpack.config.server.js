'use strict'; // eslint-disable-line strict

var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    devtool: 'source-map',
    resolve: {
        modules: [
            'node_modules',
            path.join(__dirname, 'source'),
        ]
    },
    entry: './source/server/index.js',
    output: {
        path: path.join(__dirname, 'build/server'),
        filename: 'index.js',
        publicPath: '/static/',
    },
    externals: [nodeExternals()],
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
        loaders: [{
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'source'),
            },
            {
                test: /\.(png|jpg|gif|GIF|ttf|woff|eot|svg|css)$/,
                loader: 'file-loader?emitFile=false&name=[name].[ext]&publicPath=assets/',
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
        ],
    },
};
