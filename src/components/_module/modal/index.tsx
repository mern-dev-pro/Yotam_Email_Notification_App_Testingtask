import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import styles from "./style.module.scss";
import AppButton from "../../_basic/button";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
  heading?: string;
};

const AppModal: React.FC<Props> = ({ isOpen, setIsOpen, children, heading = "" }) => {
  function close() {
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} as="div" className={styles.wrapper} onClose={close}>
      <div className={styles.contents}>
        <div className={styles.panelWrapper}>
          <DialogPanel transition className={styles.panel}>
            <DialogTitle as="h3" className={styles.panelTitle}>
              {heading}
            </DialogTitle>
            <div className={styles.panelContent}>{children}</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AppModal;
