import React from "react";
import { Checkbox } from "@headlessui/react";

import styles from "./style.module.scss";

type Props = {
  name: string;
  value: string;
  label?: string;
  checked: boolean;
  onChange: (val: boolean) => void;
};

const AppCheckbox: React.FC<Props> = ({ label, checked, onChange }) => {
  return (
    <div className={styles.wrapper}>
      <Checkbox
        checked={checked}
        onChange={onChange}
        className="group block size-5 rounded bg-white border border-gray data-[checked]:bg-primary"
      >
        <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
          <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Checkbox>
      <label className={styles.label}>{label}</label>
    </div>
  );
};

export default AppCheckbox;
