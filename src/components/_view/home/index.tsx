"use server";
import React from "react";
import { format } from "date-fns";

import ActionForNotification from "./_module/actionForNotification";
import AppContainer from "../../../layouts/container";
import NotificationManager from "./_module/notificationManager";
import { client } from "../../../utils/mongo";

import styles from "./style.module.scss";

const HomePage = async () => {
  try {
    await client.connect();
    const notificationsRes = client.db(process.env.MONGODB_DB_NAME).collection("notifications").find();
    const notifications = await notificationsRes.toArray();

    return (
      <section className={styles.wrapper}>
        <AppContainer>
          <NotificationManager />
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <div>Interval</div>
              <div className={styles.date}>Date</div>
              <div>Next Date</div>
              <div className={styles.query}>Search Query</div>
              <div className={styles.emails}>Emails</div>
              <div className={styles.score}>Relevancy Score</div>
              <div>Action</div>
            </div>
            <div className={styles.tableBody}>
              {notifications.map((notification, idx) => (
                <div className={styles.tableRow} key={idx}>
                  <div>{notification.interval}</div>
                  <div className={styles.date}>
                    {notification.interval !== "week"
                      ? format(notification.date ?? "", "MM/dd/yyyy")
                      : notification?.day?.join(", ")}
                  </div>
                  <div>{notification?.plannedDate ? format(notification?.plannedDate, "MM/dd/yyyy") : ""}</div>
                  <div className={styles.query}>{notification?.searchString}</div>
                  <div className={styles.emails}>{notification?.emails?.join(", ")}</div>
                  <div className={styles.score}>{notification?.relevancyScore}</div>
                  <div className={styles.actions}>
                    <ActionForNotification
                      id={notification?._id.toString()}
                      notification={JSON.parse(JSON.stringify(notification))}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AppContainer>
      </section>
    );
  } catch (error) {
    await client.close();
    return <div className={styles.errorScreen}>Something went wrong! DB connection failed</div>;
  }
};

export default HomePage;
