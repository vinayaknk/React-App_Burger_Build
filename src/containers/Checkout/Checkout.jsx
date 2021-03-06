import React, { Component } from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary.jsx'
import {Route,Redirect} from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData'

import {connect} from 'react-redux'

class Checkout extends Component {

    checkoutContinuedHandler =() =>{
        this.props.history.replace('/checkout/contact-data');
    }
    checkoutCanceledHandler  =() =>{
        this.props.history.goBack();
    }

    render() { 
        let summary = <Redirect to="/" />
        if (this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary =(
                <div>
                    {purchasedRedirect}
                <CheckoutSummary ingredients={this.props.ings} 
                checkoutCanceled={this.checkoutCanceledHandler} 
                checkoutContinued={this.checkoutContinuedHandler} />
                <Route path={this.props.match.path + '/contact-data'} 
                component={ContactData} />
            </div>                
            )
        }
        return summary;
    }
}

const mapStateToProps = state =>{return{
     ings : state.burger.ingredients,
     purchased : state.order.purchased
    }}

export default connect(mapStateToProps)(Checkout);