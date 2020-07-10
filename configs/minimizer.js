const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin'); // 压缩js 压缩es6
const {
  shouldUseSourceMap
} =  require("../.env");

const minimizer = [
  new TerserWebpackPlugin({
    parallel: true,
    cache: true,
    sourceMap: shouldUseSourceMap,
  }),
  new OptimizeCSSAssetsPlugin({
    assetNameRegExp: /\.css\.*(?!.*map)/g,
    cssProcessorOptions: {
      map: shouldUseSourceMap
        ? {
            inline: false,
            annotation: true,
          }
        : false,
    },
  }),
].filter(Boolean)

module.exports = minimizer