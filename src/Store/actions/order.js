import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const purchaseBurgerSuccess = (id, orderData) =>{
    return  {
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderDate:orderData
    }
}

export const purchaseBurgerFails = (error) =>{
    return  {
        type:actionTypes.PURCHASE_BURGER_FAILS,
         erorr : error
    }
}

export  const purchaseBurgerstart = () => {
    return {
        type : actionTypes.PURCHASE_Burger_START
    }
}

export  const purchaseBurger = (token,orderData) =>{
   return dispatch =>{
       dispatch(purchaseBurgerstart())
    axios.post('/orders.json?auth='+token,orderData)
    .then(response=>{
       dispatch(purchaseBurgerSuccess(response.data.name,orderData ))
     })
    .catch(error=>{
         dispatch(purchaseBurgerFails(error));
        });
   }
}

export  const purchaseInit = () => {
    return {
        type : actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
    type:actionTypes.FETCH_ORDER_SUCCESS,
    orders : orders
    }
}


export const fetchOrderFaile = (error) => {
    return {
         type:actionTypes.FETCH_ORDER_FAIL , 
         error : error
    }
}


export  const fetchOrdersStart = () => {
    return {
        type : actionTypes.FETCH_ORDER_START
       }
} 


export  const fetchOrders  = (token,userId) =>{
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('/orders.json'+queryParams) 
    .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
            fetchedOrders.push({
                ...res.data[key],
                id: key
            });
        }

        dispatch(fetchOrderSuccess(fetchedOrders));
    })
    .catch(err => {
       dispatch(fetchOrderFaile(err))
    })
}
 }