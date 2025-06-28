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
  mode: 'production',
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
        DashboardApp:
          'DashboardApp@https://dashboard-tan-tau-10.vercel.app/remoteEntry.js',
        ListApp: 'ListApp@https://list-six-xi.vercel.app/remoteEntry.js',
        RegisterApp:
          'RegisterApp@https://register-navy-ten.vercel.app/remoteEntry.js',
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
