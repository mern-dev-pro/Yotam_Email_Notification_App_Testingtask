import React from "react";

import AppContainer from "../../../layouts/container";
import HomePageHeader from "./_module/homepageHeader";

import styles from "./style.module.scss";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const HomePage = () => {
  return (
    <section className={styles.wrapper}>
      <AppContainer>
        <HomePageHeader />
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div>Interval</div>
            <div className={styles.date}>Date</div>
            <div>Time</div>
            <div className={styles.query}>Search Query</div>
            <div className={styles.emails}>Emails</div>
            <div className={styles.score}>Relevancy Score</div>
            <div>Action</div>
          </div>
          <div className={styles.tableBody}>
            <div className={styles.tableRow}>
              <div>Interval</div>
              <div className={styles.date}>Start Date</div>
              <div>Start Time</div>
              <div className={styles.query}>Search Query</div>
              <div className={styles.emails}>Emails</div>
              <div className={styles.score}>Relevancy Score</div>
              <div className={styles.actions}>
                <button className={styles.editButton}>
                  <PencilIcon width={24} />
                </button>
                <button className={styles.deleteButton}>
                  <TrashIcon width={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </AppContainer>
    </section>
  );
};

export default HomePage;
