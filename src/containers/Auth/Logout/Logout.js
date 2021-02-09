import React, { Component } from 'react';
import * as actionTypes from '../../../Store/actions/index';
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
class Logout extends Component {
    componentDidMount()
    {
         this.props.onLogOut();
    }
    render()
    {
        return <Redirect to='/' />
    }
}
const mapDispatchToProps = dispatch =>{
    return {
     onLogOut : ()=> dispatch(actionTypes.logout())
    }
}
export default connect(null,mapDispatchToProps)(Logout)