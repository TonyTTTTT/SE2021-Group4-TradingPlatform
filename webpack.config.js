const path = require('path');
module.exports = {
    entry: {
        index: ['./UI/index.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve('./UI/build/'),
    },
    module: {
        rules: [
            { test: /.jsx$/, exclude: /node_modules/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-react','@babel/preset-env'] } } },
            { test: /.js$/, exclude: /node_modules/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-react','@babel/preset-env'] } } }
        ]
    },
    devServer: {
        //���w�}��port��9000
        port: 9000
    }
};