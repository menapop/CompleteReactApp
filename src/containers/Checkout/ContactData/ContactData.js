import React, { Component } from 'react';
import classes from '../ContactData/ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders';
import Input from  '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import  * as actionTypes from '../../../Store/actions/index'
import  { connect } from 'react-redux';

class ContatcData extends Component {
   state = {
        orderForm :{
                   name : {
                    elementType :'input',
                    elementConfig : {
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value:'',
                    validation :{
                        required: true
                    },
                     valid:false,
                     touched:false
                    },
                    street : {
                    elementType :'input',
                    elementConfig : {
                        type:'text',
                        placeholder:'street'
                    },
                    value:'',
                    validation :{
                        required: true
                    },
                     valid:false,
                     touched:false
                    }
                    ,
                       zipCode : {
                            elementType :'input',
                           elementConfig : {
                               type:'text',
                                placeholder:'zipCode'
                            },
                        value:'',
                        validation : {
                            required: true,
                            maxLength:5,
                            minLength:3
                        },
                         valid:false,
                         touched:false
                        }
   ,
                    country : {
                        elementType :'input',
                        elementConfig : {
                            type:'text',
                            placeholder:'country'
                        },
                        value:'' ,
                        validation :{
                            required: true
                        },
                         valid:false,
                         touched:false
                        }
                           ,
    
                    email:  {
                        elementType :'input',
                        elementConfig : {
                            type:'email',
                            placeholder:'email'
                        },
                        value:'',
                        validation :{
                            required: true
                        },
                          valid:false,
                          touched:false
                        
                           },
                    deliveryMethod: {
                        elementType :'select',
                        elementConfig : {
                          options : [
                              {value:'fastest', displayValue:'fastest'},
                              {value:'cheapest', displayValue:'cheapest'}
                          ]
                        },
                        value:'fastest',
                        validation:{},
                        valid:true
                           }
                         
                         },
                     formIsValid:false
   }
   orderHandler = (event)=>{
      event.preventDefault();     
     console.log(this.props.ingredients)
        this.setState({loading:true});
      const formdata= {};

      for (let formElement in this.state.orderForm)
         {
            formdata[formElement] = this.state.orderForm[formElement].value;
         }
       const order  = {
         ingredients : {...this.props.ingredients},
          price : this.props.price,
          orderData : formdata,
          userId : this.props.userId
       }

      this.props.onOrderBurger(this.props.token,order);


   }
   inputChangedHandler(event,inputIdentifier){
    
    const updatedOrderForm = {
        ...this.state.orderForm
    }
    const updatedFormElemet = {
        ...updatedOrderForm[inputIdentifier]
    }
    updatedFormElemet.value = event.target.value;
    updatedFormElemet.valid= this.checkValidity( updatedFormElemet.value,  updatedFormElemet.validation)
    updatedFormElemet.touched = true;
    console.log(updatedFormElemet);
    updatedOrderForm[inputIdentifier] = updatedFormElemet ; 
    let formIsValid =  true;

      for(let inputidentifier in updatedOrderForm )
      {
        formIsValid=  updatedOrderForm[inputidentifier].valid && formIsValid
      }

    this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid});
   }

   checkValidity(value , rule)
   {
      if(!rule)
      {
          return true;
      }
        let isValid = true ; 
         if(rule.required){
            isValid = value.trim() !=='' && isValid
         }
         if(rule.minLength)
         {
            isValid = value.length >= rule.minLength && isValid;
         }
         if(rule.maxLength)
         {
            isValid = value.length <= rule.maxLength && isValid ;
         }
         return isValid;
   }

   render () {
       const formElementArray = [];
       for (let key in this.state.orderForm)
       {
        formElementArray.push(
            {
                id:key,
                config:this.state.orderForm[key]
            }
        )
       }
       
    let form = (
        <form onSubmit={this.orderHandler}>
            {
            formElementArray.map(element=>{
                return  <Input  key={element.id}  
                        elementType={element.config.elementType} 
                        elementConfig={element.config.elementConfig}
                        value={element.value} 
                        invalid={!element.config.valid}
                        shouldValidate={element.config.validation}
                        touched={element.config.touched}
                        changed={(event)=>this.inputChangedHandler(event,element.id)}/>
              })
            }
           
           
            <Button btnType="Success"  clicked={this.orderHandler}>ORDER</Button>
        </form>
    );
    if ( this.props.loading ) {
        form = <Spinner />;
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
}
}

const mapStateToProps = state => {
    return {
        ingredients:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}
const mapDipatchToProps = dispatch => {
    return {
        onOrderBurger : (token,orderdata) => dispatch(actionTypes.purchaseBurger(token,orderdata))
    }
}

export default connect(mapStateToProps,mapDipatchToProps)(withErrorHandler(ContatcData,axios));