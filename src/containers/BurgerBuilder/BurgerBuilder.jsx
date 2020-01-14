import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger.jsx";
import axios from "../../../src/axios-order";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal.jsx";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary.jsx";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from '../../store/actions/actionTypes'

//redux
import {connect} from 'react-redux'
// import * as actionTypes from '../../store/actions/actionTypes'
import * as actions from '../../store/actions/indexActions'

class BurgerBuilder extends Component {

  state = {
    purchasing: false,
  };

  componentDidMount() {
    console.log("componentDidMount ")
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredints) {
    const sum = Object.keys(ingredints)
      .map(igkey => {
        return ingredints[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0 ;
  }

  
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.props.onInitPurchased();
    this.props.history.push('/checkout');
};
  render() {
    const disabledInfo = { ...this.props.ings };
    console.log("render ", disabledInfo);
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null
    let burger = this.props.error ? (<h1 style={{ textAlign: "center" }}>Error: Ingredients cannot be loaded</h1>) : (<Spinner />);

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger
            ingredients={this.props.ings}
            totalPrice={this.props.totalAmout}
          />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.totalAmout}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return{
    ings : state.burger.ingredients,
    totalAmout : state.burger.totalPrice,
    error: state.burger.error
  }
}
const mapDispatchToStore = dispatch => {
  return{
    onIngredientAdded : (ingName) => dispatch(actions.addIngredients(ingName)),
    onIngredientRemoved : (ingName) => dispatch({type:actionTypes.REMOVE_INGREIDIENT,ingredientName: ingName }),
    onInitIngredients : () =>dispatch(actions.initIngredients()),
    onInitPurchased : () => dispatch(actions.purchaseInit())
  }
}
export default connect(mapStateToProps,mapDispatchToStore) (withErrorHandler(BurgerBuilder,axios));
