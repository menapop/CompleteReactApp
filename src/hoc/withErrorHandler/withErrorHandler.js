import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary'
const withErrorHandler = (WrappedComponent , axios )=>{
    return  class extends Component
    {
        state = {
            error:null
        }
        errorConfirmedHandler = ()=>{
            this.setState({ error:null})
        }

        componentWillMount(){
            this.requestInteceptor = axios.interceptors.request.use(request=>{
                this.setState({ error:null});
                return request;
            })
        

            this.responseInteceptor = axios.interceptors.response.use(response=>response,error=>{
                this.setState({ error:error});
               
            })
        }
   componentWillUnmount()
     {
         console.log('will unmount ',this.requestInteceptor,this.responseInteceptor);
        axios.interceptors.request.eject(this.requestInteceptor);
        axios.interceptors.response.eject(this.responseInteceptor);
     }
        render(){
            return  (
                <Auxiliary>
                    <Modal show = {this.state.error}
                     modalClosed = {this.errorConfirmedHandler}
                    >
                       {this.state.error ? this.state.error.message : null}
                    </Modal>
                <WrappedComponent {...this.props}/>
                </Auxiliary>
            );
        }
    } 
}

export default withErrorHandler;