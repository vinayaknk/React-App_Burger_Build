import * as actionTypes from './actionTypes'
import Axios from '../../axios-order'

export const purchaseBurgerSuccess = (id,orderData) =>{
    return{
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId : id,
        orderData : orderData
    }
}

export const purchaseBurgerFail = error =>{
    return{
        type : actionTypes.PURCHASE_BURGER_FAIL,
        error : error
    }
}
export const purchaseBurgerStart = () =>{
    return{ type : actionTypes.PURCHASE_BURGER_START    }
}
export const purchaseBurgerInitiate = (orderData) => {
    return dispatch =>{
        dispatch(purchaseBurgerStart())
        Axios.post("/orders.json ", orderData)
        .then(response => { 
            dispatch(purchaseBurgerSuccess(response.data,orderData))
        })
        .catch(error =>{
            dispatch(purchaseBurgerFail(error))
        } );
    }
}

export const purchaseInit = () =>{
    return {type: actionTypes.PURCHASE_INIT}
}

// ORDER RELATED

export const fetchOrdersSuccess = orders =>{
    return{ type: actionTypes.FETCH_ORDERS_SUCCESS, orders : orders }
}

export const fetchOrdersFail = error =>{
    return{     type : actionTypes.FETCH_ORDERS_FAIL, error: error    }
}
export const fetchOrdersStart = () =>{
    return{ type : actionTypes.FETCH_ORDERS_START}
}

export const fetchOrders = () =>{
    return dispatch =>{
        dispatch(fetchOrdersStart());
        Axios.get('/orders.json').then(res =>{
            const fethedOrders = [];
            for (let key in res.data){
               fethedOrders.push({
                   ...res.data[key],
                   id: key
               })
            }
            dispatch(fetchOrdersSuccess(fethedOrders))
        })
        .catch(err =>dispatch(fetchOrdersFail(err)))
    }
}