const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 플러그인을 사용하기 위해 선언
const path = require('path');

module.exports = {
  //devtool: 'inline-source-map', // 빌드시 스타일 설정, 빌드속도와 관련이 있다. https://webpack.js.org/configuration/devtool/ 참조
  devServer: {
    contentBase: path.join(__dirname, '/'), // 읽을 파일경로
    compress: true,
    port: 9000
  },
  mode: "development", // 개발자모드, 최적화가 실행되지 않는다.
  entry: {
    bundle: './src/index.js', // 이 파일의 모듈들이 하나로 합쳐진다
  },
  output: {
    filename: '[name].js', // entry의 key로 파일명이 생성된다
    path: path.resolve(__dirname, 'dist'), // 생성된 파일경로 '현재패키지폴더/dist
    publicPath: "/dist" // 변경을 감지할 파일경로
  },
  module: {
    rules: [
      {
        test: /\.css$/, // .css로 끝나는 파일은
        use: [ // 이 로더를 사용
          // 'style-loader', // MiniCssExtractPlugin 플러그인으로 대체
          MiniCssExtractPlugin.loader, // 상단에 require('')로 모듈을 가져와야함
          'css-loader',
        ],
      },
      {
        test: /\.js?$/, // js 확장자인경우
        include : path.resolve(__dirname, 'src'), //scr 안의 파일
        exclude: ['/node_modules'], // 해당위치의 폴더를 제외
        use: {
          loader : 'babel-loader', // 바벨로더 사용
          options: {
            presets: [
              [
                '@babel/preset-env', {
                  // targets: { node: 'current' }, // 노드일 경우만
                  targets: { "browsers": ["last 2 versions", ">= 5% in KR"] },
                  modules: 'false', // :false 사용시 트리 쉐이킹 사용 (import되지 않은 exprot를 정리하는 기능)
                  debug : true
                }
              ],
            ],
          },
        }
      }
    ],
  },
  plugins: [
    // 기타 플러그인
    new MiniCssExtractPlugin({ filename: 'app.css' }),
  ],
  optimization: {},
  /*
  - resolve : 웹팩이 알아서 경로, 확장자를 처리할수 있게 도와주는 옵션
    - modules : node_modules를 넣어야 디렉토리의 모듈들을 인식
    - extensions : 여기넣은 확장자들은 웹팩에서 알아서 처리하기 때문에 파일에 따로 입력할 필요가 없음.
  */
  resolve: {
    modules: ["node_modules"], 
    extensions: [".js", ".json", ".jsx", ".css"]
  }
};