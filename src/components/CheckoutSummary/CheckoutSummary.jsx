import React from 'react';
import Burger from '../Burger/Burger.jsx'
import styles from './CheckoutSummary.module.css'

const checkoutSummary = (props) => {
    return ( 
        <div className={styles.CheckoutSummary}>
            <h1>Your order summary</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
                <button className="btn btn-danger m-2" onClick={props.checkoutCanceled}>CANCEL</button>
                <button className="btn btn-primary m-2" onClick={props.checkoutContinued}>CONTINUE</button>
            </div>

        </div>
     );
}
 
export default checkoutSummary;