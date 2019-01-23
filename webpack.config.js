const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    entry: {
        app: ["./src/index.js"]
    },
    devtool: 'false',
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html')
        }),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDom: 'react-dom',
            PropTypes: 'prop-types'
        }),
        new miniCssExtractPlugin({
            chunkFilename: "./css/index.css"
        })
    ],
    // 4.0 之后分代码
    optimization: {
        minimizer: [
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true,
            uglifyOptions: {
            compress: { drop_console: true },
            output: { comments: false }
            }
        }),
        new OptimizeCSSAssetsPlugin({})
        ],
        runtimeChunk: { name: () => { return 'manifest' } }
    },
    output: {
        filename: './js/[name].bundle.[hash:5].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.(m?js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader:'babel-loader'
                }
            },
            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    miniCssExtractPlugin.loader,
                    'css-loader?modules&localIdentName=_[local]_[hash:base64:5]',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            config: { path: path.resolve(__dirname, 'dev/postcss.config.js') }
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    'file-loader?limit=1&name=[name].[ext]&outputPath=/images&publicPath=../images'
                ]
            }
        ]
    },
    mode: 'production' // 设置mode
};