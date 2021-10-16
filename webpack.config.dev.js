const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');

module.exports = merge(config, {
  mode: 'development',
  devServer: {
    port: 9000,
    open: {
      target: '/index.html'
    }
  },
});