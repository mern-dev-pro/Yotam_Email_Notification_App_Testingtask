"use client";
import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

import AppButton from "../../../../_basic/button";
import AppListbox from "../../../../_basic/Listbox";
import AppModal from "../../../../_module/modal";
import AppTextInput from "../../../../_basic/textInput";
import { IOption } from "../../../../../utils/type";

import styles from "./style.module.scss";
import AppMultiInput from "../../../../_basic/multiInput";

const intervalOptions: IOption[] = [
  { label: "Week", value: "week" },
  { label: "Day", value: "day" },
  { label: "Hour", value: "hour" },
];

const HomePageHeader = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className={styles.header}>
      <AppButton onClick={() => setOpenModal(true)} label="Create" icon={<PlusIcon width={24} />} />
      <AppModal heading="Create a new notification plan" isOpen={openModal} setIsOpen={setOpenModal}>
        <div className={styles.modalContents}>
          <div className={styles.interval}>
            <AppTextInput type="number" label="Interval" className={styles.duration} />
            <AppListbox options={intervalOptions} />
          </div>
          <div>Date</div>
          <div>Time</div>
          <div className={styles.searchString}>
            <AppTextInput type="string" label="Search string" />
          </div>
          <div className={styles.emails}>
            <AppMultiInput label="Emails" />
          </div>
          <div>
            <AppTextInput type="number" label="Relevancy score" />
          </div>
        </div>
      </AppModal>
    </div>
  );
};

export default HomePageHeader;
