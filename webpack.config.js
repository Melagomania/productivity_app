let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let handleBars = require('handlebars');

module.exports = {
  entry: './src/app/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ],
    alias: {
      '@less-helpers-module': path.resolve(__dirname, 'src/assets/less/helpers'),  // alias for less helpers
      '@images-root-path': path.resolve(__dirname, 'src/assets/images')            // alias for images path
    }
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.hbs$/,
        loader: "handlebars-loader"
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.(jpe?g|png|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'images/[name].[ext]'
          }
        }]
      },
      {
        test:  /\.(svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new CopyWebpackPlugin([
      'src/index.html',
      { from: 'src/static/', to: 'static/' },
      'src/assets/images'
    ])
  ],
  devServer: {
    contentBase: './dist',
    port: 3000,
    overlay: true,
  historyApiFallback: true
  }
};
