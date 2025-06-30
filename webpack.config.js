require('dotenv/config');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { dependencies } = require('./package.json');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
  },
  mode: process.env.NODE_ENV,
  devServer: {
    historyApiFallback: {
      index: '/index.html',
    },
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9001,
    allowedHosts: 'all',
    devMiddleware: {
      writeToDisk: true,
    },
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.jsx', '.js', '.json', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [require.resolve('@babel/preset-react')],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      title: 'Host',
    }),
    new ModuleFederationPlugin({
      name: 'Host',
      remotes: {
        DashboardApp: `DashboardApp@${process.env.MICRO_FRONT_END_DASHBOARD}/remoteEntry.js`,
        ListApp: `ListApp@${process.env.MICRO_FRONT_END_LIST}/remoteEntry.js`,
        RegisterApp: `RegisterApp@${process.env.MICRO_FRONT_END_REGISTER}/remoteEntry.js`,
      },
      shared: {
        ...dependencies,
        react: {
          singleton: true,
          requiredVersion: dependencies['react'],
        },
        'react-dom': {
          singleton: true,
          requiredVersion: dependencies['react-dom'],
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: dependencies['react-router-dom'],
        },
      },
    }),
  ],
  target: 'web',
};
