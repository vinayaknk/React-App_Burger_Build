import React from 'react';
import styles from './Order.module.css'
const Order = (props) => {
    let Ingredients = [];

    for (let ingredientName in props.ingredients){
        Ingredients.push(
            {
                name:ingredientName, 
                amount: props.ingredients[ingredientName]
            })
    }

    const IngredientOutput = Ingredients.map(ig =>{
        return <span style={{
            textTransform: 'capitalize', display: 'inline-block', margin:'0 8px', border: '1px solid #ccc', padding: '5px'}}
        key={ig.name}>{ig.name} {ig.amount}</span>
    })
    return ( 
        <div className={styles.Order}>
            <p>Ingredients: {IngredientOutput}</p>
            <p>Total Price : <strong>{props.price}</strong></p>
        </div>
     );
}
 
export default Order;