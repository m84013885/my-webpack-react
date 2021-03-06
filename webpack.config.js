/* eslint-disable */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { routers } = require('./config.json')
const nodeModuleDir = path.resolve(process.cwd(), 'node_module')
const appDir = path.resolve(process.cwd(), 'src')

const webpackConfig = {
  performance: { maxEntrypointSize: 400000 },
  entry: {
    // app: ["./src/index.js"]
  },
  devtool: 'false',
  output: {
    filename: './js/[name].[chunkhash:5].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
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
          miniCssExtractPlugin.loader,
          {
            loader:'css-loader',
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
              config: { path: path.resolve(__dirname, 'dev/postcss.config.js') }
            }
          }
        ]
      },
      {
        test: new RegExp(`^(.*\\.common).*\\.css`),
        include: [appDir],
        exclude: [nodeModuleDir],
        use: [
          miniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        include: [appDir],
        exclude: [nodeModuleDir],
        use: [
          {
            loader:'url-loader',
            options:{ // 这里的options选项参数可以定义多大的图片转换为base64
                name: '[name].[ext]',
                limit: 8192, // 表示小于50kb的图片转为base64,大于50kb的是路径
                outputPath:'images', //定义输出的图片文件夹
                publicPath:'../images'
            }
          },
          {
            loader: "img-loader",
            options: {
              plugins: [
                require("imagemin-pngquant")({
                  quality: "10" // 质量
                }),
                require('imagemin-gifsicle')({}),
                require('imagemin-mozjpeg')({}),
                require('imagemin-optipng')({}),
                require('imagemin-svgo')({})
              ]
            }
          }
        ],
      }
    ]
  },
  // 4.0 之后分代码
  optimization: {
    runtimeChunk: { name: () => { return 'manifest' } },
    splitChunks: {
      chunks: 'initial',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 2,
      maxInitialRequests: 2,
      automaticNameDelimiter: '-',
      name: 'react',
      cacheGroups: {
        vendors: {
          test: nodeModuleDir,
          priority: -10
        },
        'react-vendor': {
          test: (module) => /react/.test(module.context),
          priority: 1
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
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
    ]
  },
  // externals: ["react", "react-dom","mobx","mobx-react"], // string（精确匹配）
  plugins: [
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //     template: path.resolve(__dirname, './index.html')
    // }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDom: 'react-dom',
      PropTypes: 'prop-types'
    }),
    new miniCssExtractPlugin({
      chunkFilename: './css/[name].[chunkhash:5].css'
    })
  ],
  mode: 'production' // 设置mode
}
routers.map((item) => {
  const {
    template
  } = item
  // 每个页面使用一个entry配置
  const routerScript = [path.resolve(__dirname, `./src/router/${template}/index.js`)]
  const plugin = new HtmlWebpackPlugin({
    filename: `${template}.html`,
    template: path.resolve(__dirname, `./src/router/${template}/index.html`),
    chunks: ['manifest', 'react', template]
  })
  webpackConfig.entry[template] = routerScript
  webpackConfig.plugins.push(plugin)
})
module.exports = webpackConfig
