const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const loaders = [
  {
    loader: 'css-loader?minimize',
    options: {
      modules: true,
    },
  },
  {
    loader: 'sass-loader',
  },
];

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, '../', 'public'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: [
              'transform-runtime',
          ],
        },
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: loaders,
        }),
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline',
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],
};
