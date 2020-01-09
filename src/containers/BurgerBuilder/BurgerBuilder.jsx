import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger.jsx";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal.jsx";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary.jsx";
import axios from "../../../src/axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
//redux
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    console.log("componentDidMount");
    //   axios
    //     .get("https://react-burger-60fd2.firebaseio.com/ingredients.json")
    //     .then(response => {
    //       this.setState({ ingredients: response.data });
    //     })
    //     .catch(error => {
    //       this.setState({ error: true });
    //     });
  }

  updatePurchaseState(ingredints) {
    const sum = Object.keys(ingredints).map(igkey => {
        return ingredints[igkey];
      }).reduce((sum, el) => {return sum + el;
      }, 0);
    return sum > 0;
  }


  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const orderObject = {
      ingredients: this.state.ingredints,
      price: this.props.totalAmount,
      customer: { name: "vinayak", email: "test@test.com" },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json ", orderObject)
      .then(response => this.setState({ loading: false, purchasing: false }))
      .catch(error => this.setState({ loading: false, purchasing: false }));
  };
  render() {
    const disabledInfo = { ...this.props.ings };
    console.log("render ", disabledInfo);
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? (<h1 style={{ textAlign: "center" }}>Error: Ingredients cannot be loaded</h1>) : (<Spinner />);
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} totalPrice={this.props.totalAmount}/>
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
          price={this.props.totalAmount}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return { ings: state.ingredients, totalAmount: state.totalPrice }
};
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: ingName => dispatch({type: actionTypes.REMOVE_INGREDIENT,ingredientName: ingName})
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

  // addIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   const newCount = oldCount + 1;
  //   const newIngredients = { ...this.state.ingredients };
  //   newIngredients[type] = newCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({ ingredients: newIngredients, totalPrice: newPrice });
  //   this.updatePurchaseState(newIngredients);
  // };

  // removeIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount > 0) {
  //     const newCount = oldCount - 1;
  //     const newIngredients = { ...this.state.ingredients };
  //     newIngredients[type] = newCount;
  //     const pricesubtraction = INGREDIENT_PRICES[type];
  //     const oldPrice = this.state.totalPrice;
  //     const newPrice = oldPrice - pricesubtraction;
  //     this.setState({ ingredients: newIngredients, totalPrice: newPrice });
  //     this.updatePurchaseState(newIngredients);
  //   }
  // };
