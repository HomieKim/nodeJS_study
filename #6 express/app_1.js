const express = require('express');
const path = require('path');
const morgan = require('morgan'); // 요청 응답을 기록하는 라우터

// app 에 express 할당
const app = express();
// app 관련 설정 해줌
app.set('port', process.env.PORT || 3000);
//  공통되는 기능  use
app.use(morgan('combined'));
app.use((req,res, next) => {
    console.log('app.use는 모든 요청에 대해 실행합니다.');
    next(); // 그 다음 라우터 중 일치하는 곳을 찾아감, 미들웨어는 next를 해줘야 넘어감
}, (req,res, next)=> {
    try{
        console.log('hello');
    }catch(e) {
        next(e); // 에러처리 시 throw new Error 보단 next에 파라미터로 error를 넣으면 밑에 있는 에러처리 미들웨어로 넘어감 
    }
    next();
});
// 라우터별로 설계
app.get('/', (req, res, next) => {
    //res.send('hello express');
    res.sendFile(path.join(__dirname, "/index.html"));
    //res.sned("응답 두번 보냄") 요청에 대한 응답을 하나이상 보낼 경우 에러 남, use랑 같이 2번 보내도 에러남
    // res.json, res.render 도 응답을 보내는 것이므로 중복해서 쓰면 안됨, return이 아니기때문에 밑에 있는 console.log는 실행됨
    if(true){
        next('route'); // next는 다음 미들웨어로 넘어가지만 route키워드를 인자로 넘길 경우 다음 라우터로 넘어감
    }else{
        next();
    }
});

app.get('/', (req,res)=> {
    res.send('route로 넘어온 get')
});

// 실행순서를 고려해서 설계해야함, 와일드카드는 밑에 위치해야함
app.get('/category/js', (req, res) => {
    res.send('hello category/js');
});
app.get('/category/:name', (req, res) => {
    res.send('hello /:name');
    
});


app.post('/', (req,res)=> {
    res.send('hello express');
});

app.post('/about', (req,res)=> {
    res.send('hello express');
});
// 에러 처리(에러 미들웨어는 파라미터로 4개를 모두 넣어주어야 함)
app.use((err, req,res, next)=> {
    console.error(err);
    res.status(500).send(err.message); // 기본적으로 res.send는 status(200)이 생략되있습니다. 에러의 경우 status를 명시해 줄 수 있지만 보안적인 이유로 주로  404,500은 주의하여 다루어야 합니다.
});
app.listen(3000, ()=> {
    console.log('익스프레스 서버 실행');
});