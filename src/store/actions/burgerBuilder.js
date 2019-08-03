import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    };
};

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED
    }
}

export const initIngredient = () => {
    return dispatch => {
        axios.get( 'https://react-my-burger.firebaseio.com/ingredients.json' )
            .then( response => {
                dispatch(setIngredients(response.data))
            } )
            .catch( error => {
                dispatch(fetchIngredientsFailed())
            } );
    }
}