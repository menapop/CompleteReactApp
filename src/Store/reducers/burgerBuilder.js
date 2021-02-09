import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';
const initialState = {
    ingredients: null,
    totalPrice: 4,
    error : false,
    building:false
}
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};
const addIngredient = (state,action)=>{
    const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    };
    const UpdatedIngredients = updateObject(state.ingredients,updatedIngredient);
    const UpdatedState = {
        ingredients:UpdatedIngredients,
        totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building:true
    }
   return updateObject(state,UpdatedState);
}

const removeIngredient = (state,action)=>{
    const updatedIng = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    };
    const UpdatedIngs = updateObject(state.ingredients,updatedIng);
    const newState = {
        ingredients:UpdatedIngs,
        totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building:true
    }
   return updateObject(state,newState);
}

const setIngredient = (state,action) =>{
    return updateObject(state,{
        ingredients : {...action.ingredients},
        totalPrice:4,
        error:false,
        building:false
    }  )
}
const setIngredientFails = (state,action) => {
    return updateObject( { error : true } );
}
const reducer = (state=initialState,action) =>{
    switch (action.type)
    {
          case actionTypes.ADD_INGREDIENT: return addIngredient(state,action);
          case actionTypes.REMOVE_INGREDIENT : return removeIngredient(state,action);
          case actionTypes.SET_INGREDIENTS : return setIngredient(state,action)
          case actionTypes.FETCH_INGREDIENTS_FAILS : return setIngredientFails(state,action)       
         default : return state;    

    }
}

export default reducer;