import React from "react";
import classNames from "classnames";

import styles from "./style.module.scss";

type Props = {
  type?: "button" | "submit";
  variant?: "primary" | "danger" | "warn";
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: VoidFunction;
};

const AppButton: React.FC<Props> = ({
  label,
  icon,
  className = "",
  onClick = () => {},
  type = "button",
  variant = "primary",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(styles.wrapper, className, {
        [styles.primary]: variant === "primary",
        [styles.danger]: variant === "danger",
        [styles.warn]: variant === "warn",
      })}
    >
      {!!icon && icon}
      {label}
    </button>
  );
};

export default AppButton;
