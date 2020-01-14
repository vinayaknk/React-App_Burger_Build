import React, { Component } from 'react';
import styles from './ContactData.module.css'
import axios from '../../../axios-order'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input.jsx'

import {connect} from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/indexActions'


class ContactData extends Component {
    state = { 
        orderForm :{
            name: {
                elementType: 'input',
                elementConfig: {type: 'text', placeholder: 'Your Name'},
                value: '',
                validation: {required : true},
                valid : false
            },
            email: {
                elementType: 'email',
                elementConfig: {type: 'text', placeholder: 'Your Email'},
                value: '',
                validation: {required : true},
                valid : false
            },
            city : {
                elementType: 'input',
                elementConfig: {type: 'text', placeholder: 'Your City'},
                value: '',
                validation: {required : true},
                valid : false
            },
            pincode: {
                elementType: 'input',
                elementConfig: {type: 'text', placeholder: 'Pincode'},
                value: '',
                validation: {required : true},
                valid : false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'fastest', displayValue: 'Fastest'},
                              {value: 'cheapest', displayValue: 'Cheapest'}]
                },
                value: 'fastest',
                validation: {required : true},
                valid : false
            }
            }
        }
     orderHnadler = (event) =>{
        event.preventDefault();
        const formData = {}
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        const orderObject = {
        ingredients: this.props.ings,
        price: this.props.price,
        orderData: formData
     }
     this.props.onOrderBurger(orderObject);
     }
     checkValidity(value, rules){
        let isValid = false
        if (rules.required){
            isValid = value.trim() !==''
        }
        return isValid;
    }
    inputChangedHandler = (event,inputIdentifier) =>{
        const updatedOrderForm = {...this.state.orderForm }
        const newUpdatedOrderForm = {...updatedOrderForm[inputIdentifier]}
        newUpdatedOrderForm.value = event.target.value;
        newUpdatedOrderForm.valid = this.checkValidity(newUpdatedOrderForm.value, newUpdatedOrderForm.validation)
        updatedOrderForm[inputIdentifier] = newUpdatedOrderForm
        this.setState({orderForm: updatedOrderForm})
    }
    render() { 
        const formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id : key,
                config : this.state.orderForm[key]
            })
        }

        let form = (
        <form onSubmit={this.orderHnadler}>
            {formElementsArray.map(formElement =>(
                <Input key={formElement.id}
                       elementType={formElement.config.elementType} 
                       elementConfig={formElement.config.elementConfig} 
                       value={formElement.config.value} 
                       invalid={!formElement.config.valid}
                       changed={(event)=>this.inputChangedHandler(event,formElement.id)} />
            ))}
            <button className="btn btn-primary m-2" onClick={this.orderHnadler}>ORDER</button>
        </form>

        );
        if (this.props.loading){
            form = <Spinner />
        }
        return ( 
            <div className={styles.ContactData}>
                <h4>Enter your Contact data</h4>
                {form}
            </div>
         );
    }
}
 
const mapStateToProps = state =>{
    return{
        ings: state.burger.ingredients,
        price: state.burger.totalPrice,
        loading: state.order.loading
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurgerInitiate(orderData))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));