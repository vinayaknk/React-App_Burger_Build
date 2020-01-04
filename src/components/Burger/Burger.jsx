import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'


const Burger = (props) => {
////
    let ingredient_obj_to_array = Object.keys(props.ingredients)
    .map(ingKey =>{
            return [...Array(props.ingredients[ingKey])].map((x,index)=>{
                return <BurgerIngredients key={ingKey+index} type={ingKey} />;
            }
            );
        }
    ).reduce((prev, curVal)=>{
        return prev.concat(curVal)
    },[]);
/////
console.log("ingredient_obj_to_array ",ingredient_obj_to_array)
// console.log("props.ingredients ",props.ingredients)
// Object.keys(props.ingredients).map(ingKey =>{console.log("ingKey ",ingKey)})

if(ingredient_obj_to_array.length===0){
    ingredient_obj_to_array = <p>Please add ingredients</p>
}
    return ( 
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
            {ingredient_obj_to_array}
            <BurgerIngredients type="bread-bottom" />
            Total Price : Rs. {props.totalPrice}
        </div>
     );
}
 
export default Burger;