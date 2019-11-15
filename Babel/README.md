### 바벨

1. 바벨이란?

- es2015+ 문법을 사용한 코드를 예전 es5 자바스크립트 코드로 바꿔주는 도구
-

1. 설치

```bash
npm install --save-dev @babel/cli @babel/core @babel/preset-env
```

- 터미널에서 babel명령어를 사용할수 있게됨(@babel/cli)

1. .babelrc 파일생성

   ```javascript
   {
    "presets": [
      ["@babel/preset-env", { "targets": { "browsers": ["last 2 versions", ">= 5% in KR"] } }],
      ["@babel/preset-stage-2", { "decoratorsLegacy": true }]
    ]
   }
   ```

   - env, stage-2사용
   - target 옵션
   - 사용할 preset(plugin모음집)이나 plugin을 연결, babel 7버전부터 state-0 .. 3은 deprecated 되고 plugin 형식으로 추가해야함.
   - ex) es2015, es2016, env, react
   - env 프리셋은 특정한 문법 버전을 입력 할 필요 없이(es2015) 타겟 브라우저를 입력하면 알아서 사용자가 환경에 맞춰 사용할수 있게함 (추천)
   - targets 옵션 : 최신 두버전(IE 10,11, 기타 최신 두버전) and 한국에서 5% 이상 점유율을 차지하는 브라우저를 모두지원
   - targets 옵션에 따라 알아서 호환되는 자바스크립트 코드로 변경해줌
   - decoratorsLegacy 옵션이 true 이면 구버전의 decorator 옵션을 사용 할 수 있다.

1. package.json파일 script추가

```bash
"build": "babel ./public/src -d ./public/lib -w"
```

- npm run build 명령어 사용시 babel을 실행하고 ./public/src 폴더의 파일들을 babelrc의 모듈을 사용해 변환하고 ./public/lib 폴더에 복사한다.

1. babel-polyfill

- 바벨사용시 새로운 문법을 구형 자바스크립트 문법으로 변환만 해주기 때문에 es2015에서 새로추가된 객체, 메소드는 사용할수 없다.
- babel-polyfill 설치시 새로운 버전의 자바스크립트에서 제공하는 객체, 메소드들을 사용할수 있다.

```bash
npm install @babel/polyfill
```

- es2015 문법을 사용하는 파일 가장 윗줄에 다음 코드를 추가한다

```javascript
import "@babel/polyfill";
```

- 하나의 프로젝트에 한번만 사용해야한다. 중복사용시 충돌발생하므로 가장먼저 로딩되는 스크립트의 최상단에 추가
- babel이 컴파일할때 알아서 적용된다.

- 웹팩 사용시 import 하는대신 webpack 설정파일 entry에 추가해도 됨

```javascript
{
  entry: ["@babel/polyfill", "./app.js"];
}
```

1. 참조
   제로초님 블로그 내용을 공부하며 작성했으며 문제시 삭제
   https://www.zerocho.com/category/EcmaScript/post/57a830cfa1d6971500059d5a
