// const splitChunks = {
//   chunks: 'all',
//   minSize: 30,
//   // minRemainingSize: 0,
//   maxSize: 0,
//   minChunks: 1,
//   maxAsyncRequests: 6,
//   maxInitialRequests: 4,
//   automaticNameDelimiter: '~',
//   cacheGroups: {
//     vendor: { // 抽离第三方插件
//       test: /node_modules/, // 指定是node_modules下的第三方包
//       chunks: "initial",
//       name: "vendor", // 打包后的文件名，任意命名
//       priority: 10, // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
//     },
//     common: { // 抽离自己写的公共代码，common这个名字可以随意起
//       chunks: "all",
//       name: "common", // 任意命名
//       minSize: 0, // 只要大小超出设置的这个数值，就生成一个新包
//       minChunks: 2,
//       priority: 9
//     }
//   }
// }

// module.exports = splitChunks


const splitChunks = { // 目标：html的js文件中 以import方式引入的js
  chunks: 'all', // all 分割异步同步代码（需要定义新规则，将同步的代码打包）打包数量除了split块，剩下一个包 (适合http1.0);
  minSize: 3,
  // minRemainingSize: 0,
  maxSize: 0,
  minChunks: 1,
  maxAsyncRequests: 6,
  maxInitialRequests: 4,
  automaticNameDelimiter: '~',
  cacheGroups: {
    vendor: { // 抽离第三方插件
      test: /node_modules/, // 指定是node_modules下的第三方包
      chunks: "initial", // initial 同时打包异步同步，但是异步内部的引入将不再考虑，直接打包一起，会将内容打在一起
      name: "vendor", // 打包后的文件名，任意命名
      priority: 10, // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
    },
    common: { // 抽离自己写的公共代码，common这个名字可以随意起
      chunks: "async", //   async import的数量生成打包数量 (适合http1.1~2.0)； 
      name: "common", // 任意命名
      minSize: 0, // 只要大小超出设置的这个数值，就生成一个新包
      minChunks: 2,
      priority: 9
    }
  }
}

module.exports = splitChunks