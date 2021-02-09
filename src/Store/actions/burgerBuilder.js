import * as actionTypes  from '../actions/actionTypes';
import axios from '../../axios-orders';


export const addIngredient = (name) => {
  return {
      type:actionTypes.ADD_INGREDIENT,
      ingredientName:name
  }
}

export const removeIngredient = (name) => {
    return {
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:name
    }
  }

   export const setIngredients = (ingredients) =>{
       return {
           type : actionTypes.SET_INGREDIENTS,
           ingredients : ingredients
       }
   }

   export  const fetchIngredientsFails = () =>{
       return {
        type : actionTypes.FETCH_INGREDIENTS_FAILS
       }
   }
   

  export const initIngredients = () =>{
     return dispatch => {
    axios.get('https://react-my-burger-6d4e8-default-rtdb.firebaseio.com/ingredients.json')
    .then(res=>{
        dispatch(setIngredients(res.data));
     })
     .catch(error=>{
         dispatch (fetchIngredientsFails());
     })
     }
  }