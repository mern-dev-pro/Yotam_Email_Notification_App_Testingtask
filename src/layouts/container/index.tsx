import React from "react";
import classNames from "classnames";

import styles from "./style.module.scss";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const AppContainer: React.FC<Props> = ({ children, className = "" }) => {
  return <div className={classNames(styles.container, className)}>{children}</div>;
};

export default AppContainer;
