import React from "react";
import DatePicker from "react-datepicker";

import styles from "./style.module.scss";

import "react-datepicker/dist/react-datepicker.css";

type Props = {
  label?: string;
  variant?: "date" | "time";
  disabled?: boolean;
  value: Date;
  onChange: (val: Date) => void;
  errorMsg?: string;
};

const AppDatePicker: React.FC<Props> = ({
  label = "",
  variant = "date",
  disabled = false,
  value,
  onChange,
  errorMsg = "",
}) => {
  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.label}>{label}</label>}
      {variant === "date" ? (
        <DatePicker
          className={styles.wrapper}
          selected={value}
          onChange={(val) => {
            if (val) onChange(val);
          }}
          disabled={disabled}
        />
      ) : (
        <DatePicker
          className={styles.wrapper}
          selected={value}
          onChange={(val) => {
            if (val) onChange(val);
          }}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
          disabled={disabled}
        />
      )}
      {!!errorMsg && <span className={styles.error}>{errorMsg}</span>}
    </div>
  );
};

export default AppDatePicker;
