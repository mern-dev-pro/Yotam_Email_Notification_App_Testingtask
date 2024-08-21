import React, { useState } from "react";
import DatePicker from "react-datepicker";

import styles from "./style.module.scss";

import "react-datepicker/dist/react-datepicker.css";

type Props = {
  label?: string;
  variant?: "date" | "time";
};

const AppDatePicker: React.FC<Props> = ({ label = "", variant = "date" }) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.label}>{label}</label>}
      {variant === "date" ? (
        <DatePicker
          className={styles.wrapper}
          selected={startDate}
          onChange={(date) => {
            if (date) setStartDate(date);
          }}
        />
      ) : (
        <DatePicker
          className={styles.wrapper}
          selected={startDate}
          onChange={(date) => {
            if (date) setStartDate(date);
          }}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
        />
      )}
    </div>
  );
};

export default AppDatePicker;
