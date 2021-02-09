import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContatcData from '../../containers/Checkout/ContactData/ContactData' ;
import {connect} from 'react-redux';
import * as actions from '../../Store/actions/index';

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     totalPrice:0
    // }
    // componentWillMount()
    //   {
    //     const query = new URLSearchParams( this.props.location.search );
    //     const ingredients = {};
    //     let price = 0;
    //     for ( let param of query.entries() ) {
    //         // ['salad', '1']
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState( { ingredients: ingredients, totalPrice: price } );
           
    //   }

    checkOutCanceledHandler = ()=>{
       this.props.history.goBack();
    }
    checkOutContinuedHandler = ()=>{
        this.props.history.replace('/Checkout/contact-data');
    }
    render() {
        console.log(this.props.ingredients)
        let summary = <Redirect to='/' />
        if(this.props.ingredients)
        {   
            const purchaseRedirect = this.props.purchased ?  <Redirect to='/' />  : null 

            summary = (
                <div>
                {purchaseRedirect}
                <CheckoutSummary 
                ingredients={this.props.ingredients}
                checkOutCanceled ={this.checkOutCanceledHandler}
                checkOutContinued={this.checkOutContinuedHandler}
                />
                <Route path="/Checkout/contact-data" component={ContatcData}/>
                </div>
            );
        }
        return summary;
    }
}
const mapStateToProps = state => {
    return {
        ingredients:state.burgerBuilder.ingredients,
        totalPrice:state.burgerBuilder.totalPrice,
        purchased :state.order.purchased,
       
    }
}



export default  connect(mapStateToProps)(Checkout);