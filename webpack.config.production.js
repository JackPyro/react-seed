const webpack = require('webpack');
const path    = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const templatePath = path.join(__dirname, 'src', 'index.production.tpl');

const config = {
  entry: {
    app: path.join(__dirname, 'src', 'index.jsx'),
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'app.[hash].js',
  },
  module: {
    noParse: ['node_modules/react'],
    loaders: [
      { test: /(.js|.jsx)/, exclude: /node_modules/, loaders: ['babel?cacheDirectory=true'] },
      { test: /src\/assets\/icons\/[^\.]+\.svg/, loader: 'svg-sprite!svgo?useConfig=svgoIcons' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss') },
    ],
  },
  resolve: {
    root: path.join(__dirname, 'src'),
    extensions: ['', '.js', '.json', '.jsx', '.css', '.svg'],
  },
  stats: {
    colors: true,
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[hash].js'),
    new webpack.DefinePlugin({
      'NODE_ENV': "production",
    }),
    new HtmlWebpackPlugin({
      template: templatePath,
    }),
    new ExtractTextPlugin('app.[contenthash].css', {
      allChunks: true,
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
  devtool: 'cheap-module-eval-source-map',
};

module.exports = config;