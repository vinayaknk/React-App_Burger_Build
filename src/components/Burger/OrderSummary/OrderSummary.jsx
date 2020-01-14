import React, { Component } from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
// import Button from "../../UI/Button/Button.jsx";

class OrderSummary extends Component {
  //OrderSummary could be function component
  // componentWillUpdate not required,
  // componentWillUpdate() {
  //   console.log("order summary will update");
  // }

  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map(
      igkey => {
        return (
          <li key={igkey}>
            <span style={{ textTransform: "capitalize" }}>{igkey}</span>
            {this.props.ingredients[igkey]}
          </li>
        );
      }
    );
    return (
      <Aux>
        <h3> Your Order</h3>
        <p>A delicious Burger with the following ingredients</p>
        <ul>{ingredientsSummary}</ul>
        <p>
          <strong>Total price: {this.props.price}</strong>
        </p>
        <p>Continue to checkout</p>
        <button className="btn btn-primary" onClick={this.props.purchaseCancelled}>
          CANCEL
        </button>
        <button className="btn btn-danger" onClick={this.props.purchaseContinued}>
          CONTINUE
        </button>
      </Aux>
    );
  }
}

export default OrderSummary;
