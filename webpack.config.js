const path = require('path');

module.exports = {
    entry:{
        station1: "./client/station1/main.js"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'public/js')
    },
    module: {
        loaders:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}