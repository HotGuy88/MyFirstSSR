const express = require('express')  //라우팅 모듈
const app = express()
const port = 3000

const fs = require('fs')    // 파일 리드 모듈
const mysql = require('mysql2');    // mysql 모듈
const crypto = require('crypto');  // 암호화 모듈

const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'test'
})

let rf = fs.readFileSync('./my_data/signup.html', 'utf-8', (err, data) => data)

app.get('/', (req, res) =>{
    res.send(rf)
})

let count = 0;

app.use( (req,res,next) => {
    count++;
    let today = new Date();
    console.log(count +' 번째 사용자 접속 시간 : ' + today);
    next();
})


app.get('/Signup', (req, res) =>{       //req. 요청. client -> server

        var id = req.query.id;
        var pw = req.query.pw;

        //crypeto.createHash('sha512').update('123').digest('base64');

        var AESpw = crypto.createHash('sha512').update(pw).digest('base64');
        var arr = [id,AESpw];

        var I_sql = 'insert into user(id, pw) values(?,?)';

        conn.query(I_sql,arr, (err,results,fields) =>{
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
                let is_exist = false;
                let i;

                for (i = 0 ; i < results.length ; i++){
                    if(results[i].val == true)     // true로 일치하는 계정이 있다면
                        is_exist = true;        // 존재한다.
                }

                if(is_exist){
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