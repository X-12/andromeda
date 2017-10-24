const path = require('path');

module.exports = {
    entry:{
        captain: "./client/stations/captain.js",
        navigations: "./client/stations/navigations.js",
        tactical: "./client/stations/tactical.js",
        operations: "./client/stations/operations.js",
        engineer: "./client/stations/engineer.js",
        mvs: "./client/stations/mvs.js",
        fd: "./client/stations/fd.js"
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