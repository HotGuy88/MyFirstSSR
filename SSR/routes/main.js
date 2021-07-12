const express = require('express')  //라우팅 모듈
const app = express()
const port = 3000

const fs = require('fs')    // 파일 리드 모듈
const mysql = require('mysql2');    // mysql 모듈
const crypto = require('crypto');  // 암호화 모듈

const conn = mysql.createConnection({   // DB와의 연결 선언
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'test'
})

let rf = fs.readFileSync('./my_data/signup.html', 'utf-8', (err, data) => data)         // 메인 페이지 저장

app.get('/', (req, res) =>{     // root경로에 메인 페이지 전송
    res.send(rf)
})

let count = 0;

app.use( (req,res,next) => {    // 사용자 순번과, 접속 시간을 알려주는 미들웨어
    count++;
    let today = new Date();
    console.log(count +' 번째 사용자 접속 시간 : ' + today);
    next();
})


app.get('/Signup', (req, res) =>{       //req. 요청. client -> server

        var id = req.query.id;      // get으로 전달받은 id 값을 저장
        var pw = req.query.pw;      // get으로 전달받은 pw 값을 저장

        var AESpw = crypto.createHash('sha512').update(pw).digest('base64');    //     전달받은 pw를 해시값으로 변환
        var arr = [id,AESpw];

        var I_sql = 'insert into user(id, pw) values(?,?)';         // 사용자 id와, 변환한 pw를 db에 삽입

        conn.query(I_sql,arr, (err,results,fields) =>{      // 쿼리를 전송하고, 반환값에 따른 결과값 출력
            if(err){
                console.log(err)
                res.send("가입 실패")
            }
            else{
                res.send("id : "+ arr[0] + '\n 가입 성공!')
            }
    });
});


app.get('/Login', (req, res) =>{

        var id = req.query.id;
        var pw = req.query.pw;

        var AESpw = crypto.createHash('sha512').update(pw).digest('base64');

        var arr = [id,AESpw];

        var S_sql = 'select id , pw , case when id = ? and pw = ? then true else false END as val from user';

        conn.query(S_sql,arr, (error,results,fields) =>{
            if(error){
                console.log(error)
            }
            else{
                let is_exist = false;       // 로그인을 위한 boolean 변수. 사용자가 입력한 값이 db에 저장되어 있는지를 판단하기 위함
                let i;

                for (i = 0 ; i < results.length ; i++){ // 사용자 정보를 탐색하는 반복문
                    if(results[i].val == true)     // true로 일치하는 계정이 있다면
                        is_exist = true;        // 존재한다.
                }

                if(is_exist){           // 사용자가 입력한 값이 존재하면, 로그인 성공창 
                    let lo = fs.readFileSync('./my_data/Login.html', 'utf-8', (err, data) => data)
                    //console.log(results);
                    res.send(lo)
                }
                else{
                    res.send("실패")
                }                
            }
        });
    })


app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`)
})
