const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const PATHS = {
  source: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist')
  };

const config = {
  entry: {
    main: './src/js/main'
  },
  
  output: {
    filename: './dist/js/bundle.js',
},
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
  ],
  module: {
    rules: [
            
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true,
        },            
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
                                     
    ],
  },
};

module.exports = config;
