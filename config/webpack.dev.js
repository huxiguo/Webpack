const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/main.js',
  output: {
    path: undefined,
    filename: 'static/js/main.js', // 将 js 文件输出到 static/js 目录中
    clean: true
  },
  module: {
    rules: [
      {
        // 用来匹配 .css 结尾的文件
        test: /\.css$/,
        // use 数组里面 Loader 执行顺序是从右到左
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb的图片会被base64处理
          }
        },
        generator: {
          // 将图片文件输出到 static/imgs 目录中
          // 将图片文件命名 [hash:8][ext][query]
          // [hash:8]: hash值取8位
          // [ext]: 使用之前的文件扩展名
          // [query]: 添加之前的query参数
          filename: 'static/imgs/[hash:8][ext][query]'
        }
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[hash:8][ext][query]'
        }
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
          // options: {
          //   presets: ['@babel/preset-env']
          // }
        }
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, '../src')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    })
  ],
  devServer: {
    host: 'localhost', // 启动服务器域名
    port: '8888', // 启动服务器端口号
    open: true // 是否自动打开浏览器
  },
  mode: 'development'
}
