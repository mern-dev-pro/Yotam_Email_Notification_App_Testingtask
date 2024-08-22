import React from "react";
import classNames from "classnames";

import styles from "./style.module.scss";
import { ScaleLoader } from "react-spinners";

type Props = {
  type?: "button" | "submit";
  variant?: "primary" | "danger" | "warn";
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: VoidFunction;
  isPending?: boolean;
};

const AppButton: React.FC<Props> = ({
  label,
  icon,
  className = "",
  onClick = () => {},
  type = "button",
  variant = "primary",
  isPending = false,
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
      {isPending ? (
        <ScaleLoader color="white" height={14} width={2} />
      ) : (
        <>
          {!!icon && icon}
          {label}
        </>
      )}
    </button>
  );
};

export default AppButton;
