const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'main.js',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'docs'),
    },
  },
};