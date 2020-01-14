import * as actionTypes from '../actions/actionTypes';

const intialState = {
    ingredients: null,
    totalPrice: 100,
    error : false
}

const INGREDIENT_PRICES = {
    salad: 30,
    cheese: 20,
    meat: 60,
    bacon: 50
  };

  const addIngredient = (state,action)=>{
    return {
        ...state,
        ingredients: {...state.ingredients,[action.ingredientName] : state.ingredients[action.ingredientName] + 1},
        totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
  }
  const removeIngredient = (state,action)=>{
    return {
        ...state,
        ingredients: {...state.ingredients,[action.ingredientName] : state.ingredients[action.ingredientName] - 1},
        totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
  }
const setIngredients = (state,action) => {
    return {
        ...state,
        ingredients: {
            salad : action.ingredients.salad,
            bacon : action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat  : action.ingredients.meat
        },
        totalPrice : 100,
        error: false
    }
}
const reducer = (state=intialState,action) =>{
    switch(action.type){
        case actionTypes.ADD_INGREIDIENT    : return addIngredient(state,action);
        case actionTypes.REMOVE_INGREIDIENT : return removeIngredient(state,action);
        case actionTypes.SET_INGREDIENTS    : return setIngredients(state,action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return{...state,error : true};
        default : return state;
    }
};

export default reducer;