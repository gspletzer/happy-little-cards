const path = require('path');
const webpack = require('webpack');

module.exports = {
  //notes point of entry for webpack
  entry: {
    //can just write the path, but best practice is to list as src
    src: './client/index.js',
  },
  //notes where you want your webpack to emit the bundles when it runs and how to name those files
  output: {
    //only needed for production
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  devServer: {
    publicPath: '/build/',
    //add when wanting to link a proxy server
    proxy: {
      '/api': 'http://localhost:3000'
    },
    contentBase: path.resolve(__dirname, 'client')
  },
  //only needed for development mode
  //sets mode for webpack
  mode: process.env.NODE_ENV,
  //module rules
  module:{
    rules: [{
      //tests jsx docs
      test: /.(js|jsx)$/,
      //excludes node modules
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          //install necessary presets
          presets: ['@babel/preset-env', '@babel/preset-react']
       }
      }
    },
    {//tests the css/sass docs
      test: /.(css|scss)$/,
      exclude: /node_modules/,
      //install all three loaders before you can "use"
    use:[
      'style-loader',
      'css-loader',
      ],
    },
    {
      test:/\.(.png|svg|jpg|gif)$/,
      use:[
        'file-loader',
      ],
    },
  ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }, 
};