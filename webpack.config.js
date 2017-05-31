const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/madefire.js',
  output: {
    libraryTarget: 'var',
    library: 'Madefire',
    path: path.resolve(__dirname, 'build'),
    filename: 'madefire.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['env'],
        },
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ],
  stats: {
    colors: true,
  },
  devtool: 'source-map',
};
