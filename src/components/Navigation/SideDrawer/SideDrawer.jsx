import React from "react";
// import Logo from "../../Logo/Logo.jsx";
import NavigationItems from "../../Navigation/NavigationItems/NavigationItems.jsx";
import styles from "./SideDrawer.module.css";
// import Backdrop from "../../UI/Backdrop/Backdrop.jsx";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

const sideDrawer = props => {
  let attachedClasses = [styles.SideDrawer, styles.Close];
  if (props.open) {
    attachedClasses = [styles.SideDrawer, styles.Open];
  }
  return (
    <Aux>
      {/* <Backdrop show={props.open} clicked={props.closed} /> */}
      <div className={attachedClasses.join("")}>
        {/* <div className={styles.Logo}><Logo /></div> */}
        <nav>
          {" "}
          <NavigationItems />{" "}
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
