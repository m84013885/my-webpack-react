const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: {
        app:["./src/index.js",'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000']
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html')
        }),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDom: 'react-dom',
            PropTypes: 'prop-types'
        })
    ],
    output: {
        publicPath: '/'
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
                use: [
                    'style-loader',
                    'css-loader?modules&localIdentName=_[local]_[hash:base64:5]',
                    {
                        loader: 'postcss-loader',
                        options: {
                          ident: 'postcss',
                          config: { path: path.resolve(__dirname, 'postcss.config.js') }
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    mode: 'development' // 设置mode
};