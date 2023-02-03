const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
  // 파일을 읽기 위한 진입점 설정
  entry: './js/main.js',

  // 번들을 반환하는 설정
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },

  // enrty에서 output하는 과정에서 plugin을 사용한다.
  plugins: [
    new HtmlPlugin({
      template: './index.html' // 템플릿으로 해당 파일을 사용한다.
    }),
    new CopyPlugin({
      patterns: [
        { from : 'static'}
      ]
    })
  ],

  devServer: {
    host: 'localhost'
  }
}