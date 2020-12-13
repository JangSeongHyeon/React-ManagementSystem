import React from 'react';
import Axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



class CustomerEdit extends React.Component{

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
        
      }


    // 생성자 정의
    constructor(props){
        super(props);
        this.state={
            userName:this.props.name,
            birthday:this.props.birthday,
            gender:this.props.gender,
            job:this.props.job,
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

    // 값이 변경됐을 때 호출되는 함수
    handleValueChange=(e)=>{
        let nextState={};
        //해당 변경된 태그의 변경된 값을 state에 반영
        nextState[e.target.name]=e.target.value;

        //nextState를 이용해서 현재 state값을 갱신
        this.setState(nextState);
    }


    //수정하기 버튼 눌렀을 때 호출되는 함수
    handleFormEditSubmit=(id)=>{
        this.editCustomer(id)
            .then((response)=>{
                console.log(response.data);
                this.props.stateRefresh();
                
                this.setState({
                    userName:'',
                    birthday:'',
                    gender:'',
                    job:'',
                    open:false
                })

                this.handleClose();
               
            })
    }


    //수정 기능을 수행하는 api함수
    editCustomer=(id)=>{
        const url='/api/customers/edit/'+id;
        
        const formData=new FormData();
        formData.append('name',this.state.userName);
        formData.append('birthday',this.state.birthday);
        formData.append('gender',this.state.gender);
        formData.append('job',this.state.job);
        formData.append('_method','patch');
        
        const config={
            headers:{
                'content-type':'application/json'
            }
        }

        return Axios.post(url,formData,config);

        
        
    }
    
    render(){
        return(
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>수정</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>수정창</DialogTitle>
                    <DialogContent>
                        <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br />
                        <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /><br />
                        <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}  /><br />
                        <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /><br />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e)=>{this.handleFormEditSubmit(this.props.id)}}>수정하기</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default CustomerEdit;