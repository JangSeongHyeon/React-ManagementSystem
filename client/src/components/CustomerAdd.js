import React from 'react';
import {post} from 'axios';
// import Customer from './Customer';
// import { response } from 'express';

class CustomerAdd extends React.Component{
    // 생성자 정의
    constructor(props){
        super(props);
        this.state={
            //변수값 초기화

            //file은 실제 bite형태의 데이터 , filename은 보내고자 하는 file데이터의 이름
            file:null,
            userName:'',
            birthday:'',
            gender:'',
            job:'',
            fileName:''
        }
    }

    // 고객추가하기 버튼을 눌렀을 때 호출되는 함수
    handleFormSubmit=(e)=>{
        console.log(this.state.fileName);
        e.preventDefault()
        //addCustomer함수 호출
        this.addCustomer()
            // 서버로부터 어떠한 response가 왔을 때
            .then((response)=>{
                console.log(response.data);
                this.props.stateRefresh();
            })
        
        this.setState({
            file:null,
            userName:'',
            birthday:'',
            gender:'',
            job:'',
            fileName:''
        })
        

        window.location.reload();
    }


    // 파일 첨부 함수
    handleFileChange=(e)=>{
        this.setState({
            //여러가지 파일 중에서 0 인덱스의 파일을 선택해서 올림
            file:e.target.files[0],
            fileName:e.target.value
        })
    }


    // 값이 변경됐을 때 호출되는 함수
    handleValueChange=(e)=>{
        let nextState={};
        //해당 변경된 태그의 변경된 값을 state에 반영
        nextState[e.target.name]=e.target.value;

        //nextState를 이용해서 현재 state값을 갱신
        this.setState(nextState);
    }


    // 추가할 데이터를 서버로 보내는 함수
    addCustomer=()=>{
        const url='/api/customers';

        //formData를 이용해 데이터를 서버에 객체로 보냄
        const formData=new FormData();
        formData.append('image',this.state.file);
        formData.append('name',this.state.userName);
        formData.append('birthday',this.state.birthday);
        formData.append('gender',this.state.gender);
        formData.append('job',this.state.job);
        
        const config={
            headers:{
                //전달하고자하는 데이터에서 파일이 포함되어 있을 때 'multipart/form-data'를 설정해준다.
                'content-type':'multipart/form-data'
            }
        }

        //axios에 포함되어 있는 post라이브 러리 이용
        // 해당 url에 formdata를 config환경설정에 맞춰 보내줌
        return post(url,formData,config);
    }

    
    render(){
        return(
            // 고객추가 양식

            // 고객추가 버튼을 눌렀을 때 handleFormSubmit 함수가 실행됨
            <form onSubmit={this.handleFormSubmit}> 
                <h1>고객 추가</h1>
                프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /><br />
                이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br />
                생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /><br />
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /><br />
                직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /><br />
                <button type="submit">추가하기</button>
            </form>
        )
    }
}

export default CustomerAdd;