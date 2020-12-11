import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {post} from 'axios';
import { DialogContentText } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

class CustomerEdit extends React.Component{

    // 생성자 정의
    constructor(props){
        super(props);
        this.state={
            userName:this.props.name,
            birthday:this.props.birthday,
            gender:this.props.gender,
            job:this.props.job,
            fileName:this.props.filename,
            open:false
        }
    }

    // 모달창 열기 함수
    handleClickOpen=()=>{
        this.setState({
            open:true
        });
    }

    //모달 닫기 함수
    handleClose=()=>{
        this.setState({
            open:false
        })
    }

    //수정 기능을 수행하는 api함수

    render(){
        return(
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>수정</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>수정창</DialogTitle>
                    <DialogContent>
                        <TextField label="이름" type="text" name="userName" value={this.state.userName} /><br />
                        <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} /><br />
                        <TextField label="성별" type="text" name="gender" value={this.state.gender}  /><br />
                        <TextField label="직업" type="text" name="job" value={this.state.job} /><br />
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default CustomerEdit;