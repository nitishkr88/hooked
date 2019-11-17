'use strict'

var webpack = require('webpack')

var plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
]

module.exports = {
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  output: {
    library: 'hooked',
    libraryTarget: 'umd'
  },
  plugins: plugins,
  optimization: {
    minimize: process.env.NODE_ENV === 'production' ? true : false
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
}
