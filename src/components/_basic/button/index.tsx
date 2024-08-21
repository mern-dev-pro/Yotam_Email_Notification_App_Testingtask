import React from "react";
import classNames from "classnames";

import styles from "./style.module.scss";

type Props = {
  label?: string;
  icon?: React.ReactNode;
  className?: string;
};

const AppButton: React.FC<Props> = ({ label, icon, className = "" }) => {
  return (
    <button className={classNames(styles.wrapper, className)}>
      {!!icon && icon}
      {label}
    </button>
  );
};

export default AppButton;
