# Webpack4

js, css등 여러개의 파일들을 종류별로 하나의 파일로 만들어주는 모듈

## 왜 파일을 하나로 합쳐야하나?

http 요청이 비효율적이기 때문!!
http/1.1에서는 커넥션 하나를 열어 하나씩 요청을 보내야함.
하나의 요청이 끝나야 다음 요청을 보낼수 있기때문에 요청이 많을수록 비효율적!!
=> 하나의 파일로 합쳐서 요청수를 줄인다.

## 세팅

1. npm

```bash
npm i -g webpack webpack-cli && npm i -D webpack webpack-cli
```

웹팩 4부터 webpack-cli를 설치해야 커맨드라인에 webpack 명령어를 사용할수 있음

2. webpack.config.js
   `package.json`과 동일한위체 `webpack.config.js` 파일 생성

```javascript
const webpack = require("webpack");
module.exports = {
  mode: "development",
  entry: {
    app: "파일경로"
  },
  output: {
    path: "결과물 경로",
    filename: "[name].js",
    publicPath: "서버상의경로"
  },
  module: {},
  plugins: [],
  optimization: {},
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".json", ".jsx", ".css"]
  }
};
```

파일명이 `webpack.config.js` 여야 웹팩에서 바로 인식
파일명을 바꾸고 싶다면 터미널에서 실행시 `webpack --config webpack.config.prod.js` 로 경로를 알려줌

- mode : development는 개발용, production 배포용(알아서 최적화진행)
- entry : 웹팩이 파일을 읽어들이기 시작하는 부분 키에 따라 결과물의 이름이 결정됨 ex) app.js
  - 결과물로 여러 JS를 만들고 싶은경우

```
{
  entry: {
    app: '파일 경로',
    zero: '파일 경로',
  }
}
```

- 하나의 엔트리에 여러파일을 넣고 싶은경우

```
{
  entry: {
    app: ['a.js', 'b.js'],
  },
}
```

위의경우 a.js 와 b.js가 합쳐서 app.js 결과물이 나오게됨(두개 파일만 묶이는게 아니라 해당 파일부터 시작해서 의존관계를 파악한뒤 모두 묶음)

js대신 npm모듈을 넣는것도 가능 ex)리엑트

```
{
  entry: {
    vendor: ['@babel/polyfill', 'eventsource-polyfill', 'react', 'react-dom'],
    app: ['@babel/polyfill', 'eventsource-polyfill', './client.js'],
  },
}
```

- output
  - path : output으로 나올 파일이 저장될 경로
  - publicPath : 파일이 위치할 서버상의 경로 ex)`express.static` 과 유사
  - filename : [name].js 로 입력시 entry의 key가 name의 위치에 입력됨 app.js 로 결과물이 나옴
- module
- plugin
- resolve : 웹팩이 알아서 경로, 확장자를 처리할수 있게 도와주는 옵션
  - modules : node_modules를 넣어야 디렉토리의 모듈들을 인식
  - extensions : 여기넣은 확장자들은 웹팩에서 알아서 처리하기 때문에 파일에 따로 입력할 필요가 없음.

## loader

보통 웹팩사용시 babel과 같이 사용하는데 es2015+ 문법들을 구형 브라우저와 호환시키기 위함임.

1. babel설치

```
npm install --save-dev @babel/cli @babel/core @babel/preset-env babel-loader
```

1. webpack.config 설정

```
module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env', {
                targets: { node: 'current' }, // 노드일 경우만
                modules: 'false'
              }
            ],
          ],
        },
        exclude: ['/node_modules'],
      },
    ],
  },
```

- env - modules :false 사용시 트리 쉐이킹 사용 (import되지 않은 exprot를 정리하는 기능)
- test의 정규식 조건에 부합하는 파일들은 loader에 지정한 로더가 컴파일
- exclude 제외할 폴더나 파일로 바벨로는 컴파일하지 않지만 웹팩으로는 컴파일

  1.plugins
  부가적인 기능. 압축을하거나 핫리로딩을 한다거나 하는등.

```
{
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']), // 요즘은 위의 DefinePlugin보다 이렇게 하는 추세입니다.
  ],
}
```

- LoaderOptionsPlugin : 로더들에게 옵션을 넣어주는 플러그인

1. optimization
   최적화 관련 플러그인

```
{
  optimization: {
    minimize: true/false,
    splitChunks: {},
    concatenateModules: true,
  }
}
```

## CSS번들링

1. npm

```
npm i -D style-loader css-loader mini-css-extract-plugin
```

- style-loader : 읽은 css파일을 sytle 태그로 만들어 head 태그안에 넣어줌
- css-loader : css 파일을 읽음
- mini-css-extract-plugin : style태그대신 css파일로 만듬

1. webpack.config.js

```
{
  module: {
    rules: [{
      // 전 시간 babel-loader
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }],
  }
}
```

js파일에서 `require('app.css')` 를 하면 알아서 읽어서 style 태그로 만들어줌

mini-css-extract-plugin 사용시 해당파일의 제일 윗부분에 required
'''
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
'''

```
{
  module: {
    rules: [{
      // 전 시간 babel-loader
    }, {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
    }],
  },
  plugins: [
    // 기타 플러그인
    new MiniCssExtractPlugin({ filename: 'app.css' });
  ]
}
```

module, plugis에 모두 써야함

## 기타파일 번들링

제초로님 블로그 참조

## 참조

제로초님 블로그 내용을 공부하며 작성했으며 문제시 삭제
https://www.zerocho.com/category/Webpack/post/58ac2d6f2e437800181c1657
