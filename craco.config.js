const path = require('path');
const CracoLessPlugin = require('craco-less');

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true
          }
        }
      }
    }
  ],
  webpack: {
    alias: {
      '@': resolve('src')
    },
    proxy: {
      '/api': {
        target: process.env.REACT_APP_BASE_URL,
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
};
