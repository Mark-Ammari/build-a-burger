import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../Utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, { purchased: false })

        case actionTypes.PURCHASE_BURGER_START: 
            return updateObject(state, { loading: true })

        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = updateObject(action.orderData, {
                id: action.orderId
            })
            return updateObject(state, { 
                loading: false,
                orders: state.orders.concat(newOrder)
            })

        case actionTypes.FETCH_ORDERS_START: 
            return updateObject(state, { loading: true })

        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state, { loading: false })

        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, {
                orders: action.orders,
                loaing: false
            })
        case actionTypes.FETCH_ORDERS_FAIL:
        return updateObject(state, {
            orders: action.orders,
            loaing: false
        })  
        default:
            return state;
    }
}

export default reducer