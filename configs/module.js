const {
  appPath,
  isDevelopment,
  isProduction,
  shouldUseSourceMap
} = require("../.env");
const PostCssPresetEnv = require("postcss-preset-env");
const PostcssFlexBugsfixes = require("postcss-flexbugs-fixes");
const friendlyFormatter = require("eslint-formatter-friendly")
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 单独打包css

const postCssLoaderConfig = {
  loader: "postcss-loader",
  options: {
    ident: 'postcss',
    plugins: () => [
      PostcssFlexBugsfixes,
      PostCssPresetEnv({
        autoprefixer: {
          flexbox: 'no-2009',
          overrideBrowserslist: [
            "last 100 version"
          ]
        },
        stage: 3,
      })
    ],
    sourceMap: isProduction && shouldUseSourceMap,
  },
}
const modules = {
  noParse: / jquery | lodash | lodash-es/,
  rules: [
    {
      test: /\.ejs$/,
      use: [
        {
          loader: 'ejs-loader',
          options: {
            variable: 'data',
            interpolate : '\\{\\{(.+?)\\}\\}',
            evaluate : '\\[\\[(.+?)\\]\\]'
          }
        }
      ],
    },
    // { // 这个要先与babel-loader之前定义
    //   enforce: "pre",
    //   test: /\.js$/,
    //   exclude: /node_modules/,
    //   loader: "eslint-loader",
    //   options: {
    //     formatter: friendlyFormatter
    //   }
    // },
    // {
    //   test: /\.js$/,
    //   include: appPath,
    //   use: "babel-loader"
    // },
    {
      test: /\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: "../"
          }
        },
        "css-loader",
        postCssLoaderConfig
      ].filter(Boolean)
    },
    // {
    //   test: /\.less$/,
    //   include: appPath,
    //   use: [
    //     {
    //       loader: MiniCssExtractPlugin.loader,
    //       options: {
    //         publicPath: "../"
    //       }
    //     },
    //     "css-loader",
    //     "less-loader",
    //     postCssLoaderConfig
    //   ].filter(Boolean)
    // },
    // {
    //   test: /\.(png\jpe?g|gif)$/,
    //   use: ["file-loader"]
    // },
    // {
    //   test: /\.(png|jpg|gif)$/,
    //   use: [{
    //     loader: "url-loader",
    //     options: {
    //       limit: 8 * 1024, // 小于这个时将会已base64位图片打包处理
    //       publicPath: "../images",
    //       outputPath: "images"
    //     }
    //   }]
    // },
    // {
    //   test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
    //   loader: "url-loader",
    //   options: {
    //     limit: 10000
    //   }
    // },
    // {
    //   test: /\.html$/,
    //   use: {
    //     loader: 'html-loader', // webpack-html-plugins 将会把loader任务交给它，能避免ejs模板字符串报错
    //     options: {
    //       attributes: {
    //         list: [
    //           {
    //             tag: 'img',
    //             attribute: 'src',
    //             type: 'src',
    //           }
    //         ]
    //       },
    //       minimize: true
    //     }
    //   } // html中的img标签
    // },
    
  ]
}

module.exports = modules