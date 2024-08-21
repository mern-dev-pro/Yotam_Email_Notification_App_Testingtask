import React from "react";

import styles from "./style.module.scss";
import AppContainer from "../container";

const AppHeader = () => {
  return (
    <header className={styles.wrapper}>
      <AppContainer>
        <h1 className={styles.heading}>Manage Bid Notifications</h1>
        <span className={styles.description}>
          Configure your email notification settings for relevant business bids
        </span>
      </AppContainer>
    </header>
  );
};

export default AppHeader;
