const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { routers } = require('../config.json')
const nodeModuleDir = path.resolve(process.cwd(), 'node_module')
const appDir = path.resolve(process.cwd(), 'src')
const webpackConfig = {
  entry: {},
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
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
        include: [appDir],
        exclude: [nodeModuleDir],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: new RegExp(`^(?!.*\\.common).*\\.css`),
        include: [appDir],
        exclude: [nodeModuleDir],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '_[local]_[hash:base64:5]'
              }
            }
          },
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
        test: new RegExp(`^(.*\\.common).*\\.css`),
        include: [appDir],
        exclude: [nodeModuleDir],
        use: [
          'style-loader',
          'css-loader',
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
        include: [appDir],
        exclude: [nodeModuleDir],
        use: [
          'file-loader'
        ]
      }
    ]
  },
  mode: 'development' // 设置mode
}

routers.map((item, index) => {
  const {
    name,
    template
  } = item
  const tempSrc = path.resolve(__dirname, `../src/router/${template}/index.html`)
  const plugin = new HtmlWebpackPlugin({
    filename: `${template}.html`,
    title: name,
    template: tempSrc,
    inject: true,
    chunks: [template]
  })
  webpackConfig.entry[template] = [`./src/router/${template}/index.js`, `webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000`]
  webpackConfig.plugins.push(plugin)
})
module.exports = webpackConfig
