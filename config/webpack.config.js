const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Webpack = require('webpack')
module.exports = {
    mode:'development', // 开发模式
    entry: path.resolve(__dirname, "../src/index.ts"),
    output: {
        filename: "[name].[hash:8].js",
        path: path.resolve(__dirname, "../dist"),
    },
    devServer: {
        port: 3000,
        hot: true,
        contentBase: "../dist",
        compress: true,
        open: true,
    },
    plugins:[new HtmlWebpackPlugin(),new CleanWebpackPlugin(), new Webpack.HotModuleReplacementPlugin()],
    module:{
        rules:[
          {
            test:/\.css$/,
            use:[process.env.NODE_ENV === 'development' ? { loader: 'style-loader' }: MiniCssExtractPlugin.loader,'css-loader'] // 从右向左解析原则
          },
          {
            test:/\.less$/,
            use:[
                process.env.NODE_ENV === 'development' ? { loader: 'style-loader' }: MiniCssExtractPlugin.loader,
                'css-loader',
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [require("autoprefixer")],
                        },
                    },
                },
                'less-loader'
            ]
          },
          {
            test: /\.js$/,
            use: { loader: "babel-loader" },
          }
        ]
    },
    resolve: { // 新增因为现在的文件变为了 tsx 和ts后缀名所以需要增加两个后缀名 tsx和ts
        extensions: ['.tsx', '.ts', '.json', '.js'], // 尝试按顺序解析这些后缀名。如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀。
    },
  
}