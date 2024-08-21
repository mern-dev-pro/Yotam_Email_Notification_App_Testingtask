"use server";
import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

import AppContainer from "../../../layouts/container";
import { client } from "../../../utils/mongo";
import HomePageHeader from "./_module/homepageHeader";

import styles from "./style.module.scss";
import { format } from "date-fns";

const HomePage = async () => {
  try {
    await client.connect();
    const notificationsRes = client.db(process.env.MONGODB_DB_NAME).collection("notifications").find();
    const notifications = await notificationsRes.toArray();

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
              {notifications.map((notification, idx) => (
                <div className={styles.tableRow} key={idx}>
                  <div>{notification.interval}</div>
                  <div className={styles.date}>{notification.date ? format(notification.date, "MM/dd/yyyy") : ""}</div>
                  <div>{notification?.time ? format(notification?.time, "HH:mm") : ""}</div>
                  <div className={styles.query}>{notification?.searchString}</div>
                  <div className={styles.emails}>{notification?.emails?.join(", ")}</div>
                  <div className={styles.score}>{notification?.relevancyScore}</div>
                  <div className={styles.actions}>
                    <button className={styles.editButton}>
                      <PencilIcon width={24} />
                    </button>
                    <button className={styles.deleteButton}>
                      <TrashIcon width={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AppContainer>
      </section>
    );
  } catch (error) {
    return <div className={styles.errorScreen}>Something went wrong! DB connection failed</div>;
  }
};

export default HomePage;
