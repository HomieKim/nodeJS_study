### REPL
- 자바스크립트는 스크립트언어라서 즉석해서 코드를 실행할 수 있음
- REPL이라는 콘솔 제공
- R(Read), E(Evaluate), P(Print), L(Loop)
- 콘솔로그 자체의 리턴값은 언디파인드

### 모듈
- 노드는 자바스크립트 코드를 모듈로 만들 수 있음
- 모듈: 특정한 기능을 하는 함수나 변수들의 집합
- 모듈로 만들면 여러 프로그램에서 재사용 가능
- 노드에서 제공하는 require함수안에 경로를넣어서 사용가능
- import, export 사용 가능(브라우저에서 사용되는 모듈, 완전히 같은게 아님) 

### 노드 내장 객체
* global
    - 브라우저의 window같은 전역객체
    - 생략 가능하고 전역객체를 통해 파일간에 변수를 공유가능
    - 단, 관리하는 파일이 많아지면 관리가 힘드므로 모듈 사용 권장

* console
    - global 안에 정의되있음
    - console.log 외에도 time, error, dir 등등 로깅할 때 사용

* 타이머
    - 타이머 기능을 제공하는 함수
    - setTimeout : 주어진 밀리초 이후에 콜백함수 실행
    - setInterval : 주어진 밀리초 마다 콜반함수를 반복실행
    - setImmediate : 콜백함수를 즉시 실행
    - clearTimeout : setTimeOut 취소 ...
    - 비동기 코드

* this
    - node에서 this는 자바스크립트에서 this와 조금 다릅니다.
    - 자바스크립트에서 전역에서 this시 window
    - 노드에서는 함수에서 this시 global
    - 노드에서 전역스코프에서 this시 빈 객체가 할당 됨
    ```javascript
        console.log(this); // {}    
        console.log(this === module.export); // true
        function a(){
            console.log(this === global); // true
        }
    ```

* require
    - require 에서 불러 올때 파일을 읽고 캐시에 저장
    - require.main은 실행 시 첫 모듈을 가리킵니다.
    - 한번 require 후 다음 번에 require할 때는 새로 불러오지 않고 cahce에 있는것을 재사용
    - 순환 참조시 빈 객체가 할당

* process
    - 현재 실행중인 노드 프로세스에 대한 정보를 담고 있음

### 노드 내장 모듈
- 직접 만들지 않아도 노드에서 제공해주는 모듈
* os
    - 운영체제의 정보를 담고 있음. (메모리 정보, uptime, 경로 등등)

* path
    - 운영체제 마다 경로 표시가 다른 경우가있음
    - path모듈을 사용해 경로를 처리함
    - join, resolve 메서드와 함께 사용
    - resolve는 절대경로를 우선시

* url
    - 인터넷 주소를 쉽게 조작하도록 도와주는 모듈
    - 기존 노드 방식과 WATHWG 방식 두개가 있습니다. (사용법이 조금 다름)
    - 기존 노드 방식은 parsetl username, password 대신 auth 속성이 있음

* crypto
    - 암호화를 도와 주는 모듈
    - createHash(알고리즘) : 사용할 알고리즘을 파라미터로 넣어서 암호화 사용
    - update(문자열) : 변환할 문자열을 넣음
    - digest(인코딩) : 인코딩할 알고리즘을 넣음

* fs
    - 파일 시스템에 접근하는 모듈
    - fs는 require뒤에 promise를 붙이면 자동으로 프로미스를 반환하는 형식으로 바뀜

* 동기메서드와 비동기메서드
    - 노드에서는 비동기이면 논블로킹이고 동기이면 블로킹이다 라고 이해해도 됨
    - 동기와 비동기 : 백그라운드 작업 완료 확인 여부
    - 블로킹과 논 블로킹 : 함수가 바로 return 되는지 여부
    - 비동기 방식에서는 함수가 실행되면 바로 return되어 백그라운드로 넘어가고 다음작업으로 넘어감 
    - Promise나 async, await 으로 비동기 방식으로 함수를 실행시키면서 순서를 보장할 수 있습니다.