const path = require('path');

module.exports = {
    entry:{
        station1: "./client/stations/station1.js"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'client/build')
    },
    module: {
        loaders:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader'
            }
        ]
    }
}