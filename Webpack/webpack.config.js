const path = require('path');

module.exports = {
  entry: './src/index.js', // 이 파일의 모듈들이 하나로 합쳐진다
  output: {
    filename: 'bundle.js', // 합쳐진 파일명
    path: path.resolve(__dirname, 'dist'), // 생성된 파일경로 '현재패키지폴더/dist
  },
  module: {
    rules: [
      {
        test: /\.css$/, // .css로 끝나는 파일은
        use: [ // 이 로더를 사용
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
};