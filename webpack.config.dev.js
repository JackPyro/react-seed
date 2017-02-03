const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path    = require('path');

const config = {
  entry: [
    path.join(__dirname, 'src'),
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:3000/',
  ],
  output: {
    path: path.join(__dirname, 'src'),
    filename: 'app.js',
    publicPath: '/',
  },
  module: {
    noParse: ['node_modules/react'],
    loaders: [
      { test: /(.js|.jsx)/, exclude: /node_modules/, loader: "babel", cacheDirectory: "/tmp/" },
      { test: /src\/assets\/icons\/[^\.]+\.svg/, loader: 'svg-sprite!svgo?useConfig=svgoIcons' },
      { test: /\.css/, loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss' },
    ],
  },
  resolve: {
    root: path.join(__dirname, 'src'),
    extensions: ['', '.js', '.json', '.jsx', '.css', '.svg'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
  ],
  postcss: [
    require('postcss-import'),
    require('postcss-sassy-mixins'),
    require('postcss-conditionals'),
    require('postcss-simple-vars'),
    require('postcss-color-function'),
    require('postcss-mathjs'),
    require('postcss-nested'),
    require('autoprefixer')({ browsers: ['last 2 versions'] }),
  ],
  svgoIcons: {
    plugins: [
      {
        removeAttrs: {
          attrs: [ 'fill', 'fill-rule' ]
        }
      }
    ]
  },
  devtool: 'sourcemap',
  devServer: {
    contentBase: 'src/',
    port: 3000,
    hot: true,
  },
  watch: true,
  watchOptions: {
    poll: true,
  }
};

module.exports = config;