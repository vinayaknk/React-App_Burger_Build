import * as actionTypes from './actionTypes'
import axios from "../../../src/axios-order";

export const addIngredients = name => {
    return {
        type : actionTypes.ADD_INGREIDIENT,
        ingredientName : name
    }
}

export const removeIngredients = name => {
    return {
        type : actionTypes.REMOVE_INGREIDIENT,
        ingredientName : name
    }
}

export const setIngredients = (ingrds) =>{
    console.log('setIngredients ')
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingrds
    }
}

export const fetchIngredientsFailed = () =>{
    console.log(" fetchIngredientsFailed ")
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = ()=>{
    console.log("initIngredients ")
    return dispatch => {
    axios.get("https://react-burger-60fd2.firebaseio.com/ingredients.json")
      .then(response => {
        // this.setState({ ingredients: response.data });
        dispatch(setIngredients(response.data))
        // dispatch({type: actionTypes.SET_INGREDIENTS,ingredients: response.data })
      })
      .catch(error => { dispatch(fetchIngredientsFailed())
        // dispatch({type: actionTypes.FETCH_INGREDIENTS_FAILED})
      });
    }
}