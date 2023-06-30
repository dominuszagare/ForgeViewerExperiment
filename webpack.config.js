const path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './public/app.js',
    mode: 'development',
    output: {
        path: path.join(__dirname, './build'),
        filename: 'app.js',
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {from:'public/images',to:'images'},
                {from:'public/gltf',to:'gltf'},
                {from:'public/fonts',to:'fonts'},
                {from: path.resolve(__dirname, './public/index.html')}
            ]
        }), 
    ],
    module: {
	rules: [
        {test: /\.css$/,use: ['css-loader',]},
        {test: /\.(svg|gif|png|eot|woff|ttf|jpeg|glb|gltf|bin|css)$/,loader: "file"},
	],
},
devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        port: 8080,
        open: true,
        hot: true,
    },
};