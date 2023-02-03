const path = require('path')

module.exports = {
  // 파일을 읽기 위한 진입점 설정
  entry:'./js/main.js',

  // 번들을 반환하는 설정
  output: {
    path: path.resolve(__dirname,'dist'),
    filename:'main.js'
  }
}