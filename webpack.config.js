const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    // source directory
    context: path.resolve(__dirname), // source directory
    entry: { // entry names
        'polyfills': './public/src/js/polyfills.js',
        'main': './public/src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'public/dist'), // output directory
        filename: '[name].bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            {
                test: /\.(csv|tsv)$/,
                use: ['csv-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.ejs$/,
                use: ['ejs-compiled-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env' ]
                    }
                }
            }
        ]
    },
    plugins: [
        new Dotenv()
    ],
    node: {
        fs: "empty" // avoids error messages
    }
};