import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from '../CheckoutSummary/CheckoutSummary.css'
const CheckoutSummary = (props)=>{
    
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
                btnType="Danger"
                clicked={props.checkOutCanceled}>CANCEL</Button>
            <Button 
                btnType="Success"
                clicked={props.checkOutContinued}>CONTINUE</Button>
        </div>
    );
}

export default CheckoutSummary;