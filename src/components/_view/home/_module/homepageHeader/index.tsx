"use client";
import React from "react";

import AppButton from "../../../../_basic/button";
import { PlusIcon } from "@heroicons/react/24/solid";

import styles from "./style.module.scss";

const HomePageHeader = () => {
  return (
    <div className={styles.header}>
      <AppButton label="Create Notification" icon={<PlusIcon width={24} />} />
    </div>
  );
};

export default HomePageHeader;
