import React from "react";
import classNames from "classnames";

import styles from "./style.module.scss";

type Props = {
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  placeholder?: string;
};

const AppTextInput: React.FC<Props> = ({ type = "text", label = "", className = "", placeholder = "" }) => {
  return (
    <label className={classNames(styles.wrapper, className)}>
      <span className={styles.label}>{label}</span>
      <div>
        <input placeholder={placeholder} className={styles.input} type={type}></input>
      </div>
    </label>
  );
};

export default AppTextInput;
