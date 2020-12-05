const fs=require('fs');
const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const port=process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//database.json 파일 안의 내용을 data변수에 저장
const data=fs.readFileSync('./database.json');

//data 변수에 들어가 있는 데이터를 파싱
const conf=JSON.parse(data);

//mysql 라이브러리를 불러옴
const mysql=require('mysql');
const { connect } = require('http2');

// mysql 연결 설정을함
const connection=mysql.createConnection({
  host:conf.host,
  user:conf.user,
  password:conf.password,
  port:conf.port,
  database:conf.database
});

//mysql 연결
connection.connect();


//사용자가 /api/customers의 경로로 접속 한 경우 처리
app.get('/api/customers',(req,res)=>{
  
    //CUSTOMER 테이블의 데이터를 가져옴
    connection.query(
      "SELECT*FROM CUSTOMER",

      //가져온 데이터는 rows 변수에 담겨 처리함
      (err,rows,fields)=>{

        //rows 변수를 response로 사용자에게 보여줌
        res.send(rows);
      }
    );
});

app.listen(port,()=>console.log(`Listening on port ${port}`));