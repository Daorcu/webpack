const HtmlWebPackPlugin      = require('html-webpack-plugin');
const MiniCssExtractPlugin   = require('mini-css-extract-plugin');
const OptimzeCssAssensPlugin = require('optimize-css-assets-webpack-plugin');

const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    optimization: {
        minimizer: [new OptimzeCssAssensPlugin()]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                loader: [
                    'style-loader',
                    'css-loader'
                ]
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
                    minimize: false
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
        new HtmlWebPackPlugin ({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin ({
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                {from: 'src/assets', to: 'assets/'}
            ]
        })
    ]
}