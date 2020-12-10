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

// 파일처리를 위한 multer 라이브러리 사용
const multer=require('multer');

// 업로드가 되는 파일을 설정
const upload=multer({dest:'./upload'});


//사용자가 /api/customers의 경로로 접속 한 경우 처리
app.get('/api/customers',(req,res)=>{
    //CUSTOMER 테이블의 데이터를 가져옴
    connection.query(
      "SELECT*FROM  CUSTOMER WHERE isDeleted=0",

      //가져온 데이터는 rows 변수에 담겨 처리함
      (err,rows,fields)=>{

        //rows 변수를 response로 사용자에게 보여줌
        res.send(rows);
      }
    );
});

//upload라는 파일에 사용자가 image라는 경로에 접근해서 upload폴더의 이미지 확인가능
app.use('/image',express.static('./upload'));

//post방식으로 사용자가 고객추가 데이터를 전송했을 때 이를 처리
app.post('/api/customers',upload.single('image'),(req,res)=>{
  let sql='INSERT INTO CUSTOMER VALUES (null,?,?,?,?,?,now(),0)';

  let image='http://localhost:5000/image/'+req.file.filename
  //사용자는 image경로에 있는 해당 파일로 접근하게 됨
  //filename은 multer라이브러리가 자동으로 겹치지 않도록 할당을 해줌
  
  // 각각의 변수 값을 전달 받음
  let name=req.body.name;
  let birthday=req.body.birthday;
  let gender=req.body.gender;
  let job=req.body.job;


  let params=[image,name,birthday,gender,job];

  //insert의 ????부분에 데이터를 바인딩 해서 넣음
  connection.query(sql,params,
    (err,rows,fields)=>{
      res.send(rows);
    })
});

//delete 작업을 하는 서버 모듈을 추가
app.delete('/api/customers/:id',(req,res)=>{
  let sql='UPDATE CUSTOMER SET isDeleted=1 WHERE id=?';
  let params=[req.params.id];
  connection.query(sql,params,
    (err,rows,fields)=>{
      res.send(rows);
    })
});


app.listen(port,()=>console.log(`Listening on port ${port}`));