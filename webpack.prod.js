
const HtmlWebPackPlugin      = require('html-webpack-plugin');
const MiniCssExtractPlugin   = require('mini-css-extract-plugin');
const OptimzeCssAssensPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');



const CopyPlugin = require('copy-webpack-plugin');

const MinifyPlugin = require("babel-minify-webpack-plugin");


module.exports = {
    mode: 'production',
    optimization: {
        minimizer: [new OptimzeCssAssensPlugin()]
    },
    output: {
        filename: 'main.[contentHash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                loader: [
                    'style-loader',
                    'css-loader'
                ],
            },
            {
                test: /styles\.css$/,
                loader: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]                
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: true
                },
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    esModule: false
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin ({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin ({
            filename: '[name].[contentHash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                {from: 'src/assets', to: 'assets/'}
            ]
        }),
        new MinifyPlugin()

    ]
}