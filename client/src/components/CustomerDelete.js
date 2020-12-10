import React from 'react';

class CustomerDelete extends React.Component{

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
            <button onClick={(e)=>{this.deleteCustomer(this.props.id)}}>삭제</button>
        )
    }
}

//CustomerDelete 컴포넌트를 외부에서 사용할 수 있도록 export
export default CustomerDelete;