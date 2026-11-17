const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = 7101;
const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.ts',
  output: {
    // qiankun 要求：UMD 格式 + 唯一的 library 名称（与注册时的 name 一致）
    library: { name: 'one-bank-market', type: 'umd' },
    // 独立访问时 publicPath 用 '/'，作为子应用被 qiankun 加载时用 '__webpack_public_path__' 动态修正
    publicPath: isDev ? '/' : './',
    filename: isDev ? '[name].js' : '[name].[contenthash:8].js',
    chunkLoading: 'jsonp',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html', filename: 'index.html' }),
  ],
  devServer: {
    port,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    hot: false,
    liveReload: false,
  },
};
