import React from "react";

import AppContainer from "../../../layouts/container";
import HomePageHeader from "./_module/homepageHeader";

import styles from "./style.module.scss";

const HomePage = () => {
  return (
    <section className={styles.wrapper}>
      <AppContainer>
        <HomePageHeader />
        <div className={styles.body}></div>
      </AppContainer>
    </section>
  );
};

export default HomePage;
