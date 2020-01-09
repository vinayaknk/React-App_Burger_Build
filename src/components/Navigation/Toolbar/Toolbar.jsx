import React from "react";
import styles from "./Toolbar.module.css";
import Logo from "../../Logo/Logo.jsx";
import NavigationItems from "../NavigationItems/NavigationItems.jsx";
import DrwerToggle from "../SideDrawer/DrawerToggle/DrawerToggle.jsx";

const toolbar = props => {
  return (
    <header className={styles.Toolbar}>
      <DrwerToggle clicked={props.drwerToggleClicked} />
      <div className={styles.Logo}>
        <Logo />
      </div>
      <nav className={styles.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default toolbar;
