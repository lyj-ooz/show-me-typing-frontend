# 쇼미더타이핑 (❗️이 프로젝트의 백엔드 파트 소스는 [여기](https://github.com/lyj-ooz/react-sandbox/tree/master/show-me-typing)의 /backend 폴더에 있음 )

타이핑 게임과 그 점수에 따른 랭킹을 보여주는 웹앱 게임 사이트를 만들었다.

## 배포 버전

[https://eager-boyd-d5dc3e.netlify.app/](https://eager-boyd-d5dc3e.netlify.app/)

## 사용 기술

- react, node.js, mongoDB, webpack
- 라이브러리: dotenv, express, mongoose, cors (리액트도 라이브러리이긴 하지만..)

## API

- [https://show-me-typing.herokuapp.com/](https://show-me-typing.herokuapp.com/)
- api/scores - DB에 저장된 게임 기록들 (GET, POST)
- api/words - DB에 저장된 단어들 (GET, POST)

## 어려웠던 것, 배운 것, 느낀 것

1. css 파일 적용하기: 이 게임을 CRA가 아니라 웹팩으로 빌드 했더니 css 파일을 읽지 못했다. 에러메시지에 https://webpack.js.org/concepts/#loaders 를 참고하라고 해서 이 주소에 나온 글대로 조치하였으나 내 경우에는 'style-loader'도 설치한 후에 webpack.config.js 파일에 설정해준 후에야 css 파일을 읽을 수 있었다.

2. 개발 서버에서 proxy 설정: mongoDB에 게임 유저 이름과 게임 점수를 저장해두고 이걸 불러와서 화면에서 점수에 따른 상위 유저들 목록을 보여주고 싶었는데 계속 404가 에러가 났다. 백엔드 서버는 8888번 포트였고 클라이언트 개발 서버는 8080번 포트였다. 여기저기 검색해본 결과 뭔가 설정 값을 추가해야 한다는 것을 알았고 'react webpack api'라고 검색하여 webpack 공식 문서에서 [관련 내용 - devServer.proxy 부분](https://webpack.js.org/configuration/dev-server/)을 찾아 똑같이 설정하였더니 드디어 내가 만든 백엔드 서버에서 데이터를 읽어왔다! webpack.config.js 파일 - devServer - proxy에 서버 주소를 입력했다.

3. 배포하기(백엔드): 이왕 만든거 배포하고 싶은데 백엔드까지 구축(이라고 하면 너무 거창하지만)한 것도 처음, 웹팩도 처음이라 많이 헤맸다. 일단 백엔드는 heroku에 따로 배포했다. [https://show-me-typing.herokuapp.com/](https://show-me-typing.herokuapp.com/)가 api 주소이고 api/scores, api/words 로 데이터에 접근할 수 있다. 내가 사용하던 unsplash 같은 외부 사이트의 api도 이렇게 만들었겠구나 싶었다. POST로 아마 아무나 데이터를 추가할 수 있을 것이다. 이래서 api key나 auth key 같은 것을 발급하는구나 싶다.

4. 배포하기(프론트엔드): 프론트 단을 배포하려고 webpack.config.js 파일을 이리저리 고치다가 복잡해졌다. 그래서 저장소를 새로 만들고, 폴더도 새로 만들어서 처음부터 웹팩 설정을 다시 한 뒤에 게임 소스들만 src 폴더로 옮겼다. 다음에 웹팩으로 프로젝트를 진행하게 되면 backend, client 폴더를 나누어서 소스들을 관리해야 겠다는 생각이 들었다.

## 더 추가/개선하고 싶은 기능

- 디자인:
  - 디자인을 완벽한 반응형으로 수정하기
- 기능:
  - 시간이 얼마 안남았을 때 타이머 숫자를 빨갛게 보여주기
  - 순위는 최고 50위까지만 보여주기
  - 새로 랭킹에 추가되는 유저는 transition이나 animation을 적용해서 반짝이는 표시
  - 등록된 단어들을 모두 타이핑했을 때의 특별한 처리.
- 리팩토링:
  - state가 너무 많은데, useReducer를 사용해야 할 듯.
