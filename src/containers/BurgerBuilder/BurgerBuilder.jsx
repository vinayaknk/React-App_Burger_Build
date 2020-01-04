import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger.jsx';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad : 30,
    cheese: 20,
    meat: 60,
    bacon: 50
}
class BurgerBuilder extends Component {
    state = { 
        ingredients : {
            salad: 0,
            bacon: 0,
            meat : 0,
            cheese: 0
        },
        totalPrice: 100
     }
     addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type]
        const newCount = oldCount + 1;
        const newIngredients = {...this.state.ingredients};
        newIngredients[type] = newCount
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        this.setState({ingredients: newIngredients, totalPrice: newPrice})
     }

     removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type]
        if(oldCount >0){
            const newCount = oldCount - 1;
            const newIngredients = {...this.state.ingredients};
            newIngredients[type] = newCount
            const pricesubtraction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice
            const newPrice = oldPrice - pricesubtraction
            this.setState({ingredients: newIngredients, totalPrice: newPrice})
        }
     }


    render() { 
        const disabledInfo = {...this.state.ingredients}
        console.log("disabledInfo ",disabledInfo)
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }
        return ( 
            <Aux>
                <Burger ingredients={this.state.ingredients} totalPrice={this.state.totalPrice}/>
                <BuildControls 
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo} />
            </Aux>
         );
    }
}
 
export default BurgerBuilder;