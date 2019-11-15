/**
 * import로 가져온 모듈들은 'npx webpack' or 'npm run build' 명령어로 번들링되어 ./dist/main.js 파일로 합쳐진다.
 * 배포시 반드시 번들링해야하므로 package.json의 "private" : true설정으로 배포되지 않게함
 * "script" "build" :webpack 설정으로 'npm run build' 명령어로 번들링가능
 * 어느파일을 기준으로 번들링하며 그 파일을 어디에 생성할지는 webpack.config.js 파일에 선언
 */
import _ from 'lodash'; // lodash 의존성 가져옴
import {log} from './logTest'; // 현재폴더에서 이름이logTest인 파일에서 export한 log function 을 가져옴
import './style.css'; // webpack.config.js의 설정에따라 .css로 끝나는 파일은 style-loader, css-loader를 사용해서 번들링한다.

/**
 * body에 div를 생성하는 코드
 */
function component() {
  const element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  return element;
}

document.body.appendChild(component());

log('test'); // ./logTest.js 파일의 log함수 실행