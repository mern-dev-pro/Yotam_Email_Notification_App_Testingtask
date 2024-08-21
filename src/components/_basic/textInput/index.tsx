import React from "react";
import classNames from "classnames";
import { UseFormRegisterReturn } from "react-hook-form";

import styles from "./style.module.scss";

type Props = {
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn<any>;
  errorMsg?: string;
};

const AppTextInput: React.FC<Props> = ({
  type = "text",
  label = "",
  className = "",
  placeholder = "",
  errorMsg = "",
  register,
}) => {
  return (
    <label className={classNames(styles.wrapper, className)}>
      {!!label && <span className={styles.label}>{label}</span>}
      <div>
        <input placeholder={placeholder} className={styles.input} type={type} {...(!!register && register)}></input>
      </div>
      {!!errorMsg && <span className={styles.error}>{errorMsg}</span>}
    </label>
  );
};

export default AppTextInput;
