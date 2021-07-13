# MyFirstSSR 설명

첫 번째로 만들어본 웹 서비스 입니다. 간단한 회원가입-로그인 서비스를 제공합니다. SSR(서버 사이드 랜더링)방식으로 구현했습니다.
사용한 기능들은 express.js, mysql, html과 css 입니다.
첫 번째 개발이라 모듈 버젼관리에 신경쓰지 못했습니다. Json 파일은 따로 없습니다.


## express.js   경로 : routes/main.js

서버의 기능은 node.js로 구성하였고, 라우팅은 node.js의 express 모듈을 사용해 구현했습니다. 
미들웨어 기능을 추가해 접속한 유저의 간단한 정보를 출력하도록 했습니다.

## DB
관리 툴은 DBeaver를 사용했습니다. 회원의 id에는 primary key를 주어 중복되지 않게 하고, 서버에서 전환했던 AES 해시값을 pw로 저장하였습니다.

## HTML&CSS    경로 : My_data/signup.html
페이지 관련 작업은 html파일을 작성해 서버에서 불러들여, 라우팅 경로로 전송했습니다.
form태그를 이용해 client가 작성한 id와 pw정보를 전달했습니다.


# image파일
캡쳐한 정보를 모아둔 파일입니다.




 

 
