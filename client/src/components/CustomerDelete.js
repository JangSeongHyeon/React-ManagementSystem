import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class CustomerDelete extends React.Component{

    constructor(props){
        super(props);
        this.state={
            //현재 모달창이 열려있지 않음
            open:false
        }
    }

    // 고객추가하기 함수
    handleClickOpen=()=>{
        this.setState({
            open:true
        });
    }

    //고객모달 닫기 함수
    handleClose=()=>{
        this.setState({
            open:false
        })
    }


    //삭제 기능을 수행하는 api함수
    deleteCustomer(id){
        // /api/customer/7
        const url='api/customers/'+id;
        fetch(url,{
            method:'DELETE'
        });

        //삭제 된 이후의 고객목록을 갱신
        this.props.stateRefresh();
    }
    render(){
        return(
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>삭제경고</DialogTitle>
                    <DialogContent gutterBottom>
                        <Typography>
                            선택한 고객정보가 삭제됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e)=>{this.deleteCustomer(this.props.id)}}>삭제</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>

                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

//CustomerDelete 컴포넌트를 외부에서 사용할 수 있도록 export
export default CustomerDelete;