import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux';
import * as burgerBuilderactionTypes from '../../Store/actions/index';
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

export class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
      
        purchasable: false,
        purchasing: false,
        loading :false,
    }
  componentDidMount()
  {
      console.log(this.props);
     this.props.onInitIngredients();
  }
    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
       return sum > 0 ;
    }

    addIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        if(this.props.isAthenticated)
        {
        this.setState({purchasing: true});
        }
        else 
        {
            this.props.onSetAuthRedirectPath('/Checkout')
            this.props.history.push('/Auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/Checkout');
  

 
    }

    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        
        let ordersummary = null;
        let burger = this.props.error? <p>Some error Can not load ingredients</p> : <Spinner/>;
        if(this.props.ings)
        {
           
         burger = (
            <Auxiliary>
            <Burger ingredients={this.props.ings} />
            <BuildControls
                ingredientAdded={this.props.onIngedientAdded}
                ingredientRemoved={this.props.onIngedientRemoved}
                disabled={{...disabledInfo}}
                isAuth= {this.props.isAthenticated}
                purchasable={this.updatePurchaseState(this.props.ings)}
                ordered={this.purchaseHandler}
                price={this.props.price} />
            </Auxiliary>
              )
              console.log(disabledInfo)
         ordersummary = (
            <OrderSummary 
            ingredients={this.props.ings}
            price={this.props.price}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />
        );
         }
        if (this.state.loading){
            ordersummary = <Spinner/>
        }
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {ordersummary}
                </Modal>
              {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
  return {
      ings:state.burgerBuilder.ingredients,
      price : state.burgerBuilder.totalPrice,
      error : state.burgerBuilder.error,
      isAthenticated:state.auth.token !==null
  }
}
const mapDispatchToProps = dispatch =>{
   return {
    onIngedientAdded : (ingName) => dispatch(burgerBuilderactionTypes.addIngredient(ingName)),
    onIngedientRemoved : (ingName) => dispatch(burgerBuilderactionTypes.removeIngredient(ingName)),
    onInitIngredients : () => dispatch(burgerBuilderactionTypes.initIngredients()),
    onInitPurchase : () => dispatch(burgerBuilderactionTypes.purchaseInit()),
    onSetAuthRedirectPath : (path) => dispatch(burgerBuilderactionTypes.setAuthRedirectPath(path))
   }
}
export default  connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(BurgerBuilder,axios));