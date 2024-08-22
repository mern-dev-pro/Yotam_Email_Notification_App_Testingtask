"use client";
import React, { useEffect, useState } from "react";

import styles from "./style.module.scss";
import { XMarkIcon } from "@heroicons/react/24/solid";

type Props = {
  label?: string;
  value: string[];
  // eslint-disable-next-line no-unused-vars
  onChange: (val: string[]) => void;
  errorMsg?: string;
};

const AppMultiInput: React.FC<Props> = ({ label, value, onChange, errorMsg = "" }) => {
  const [val, setVal] = useState<string>("");
  const [selectedList, setSelectedList] = useState<string[]>(value ?? []);

  useEffect(() => {
    onChange(selectedList);
  }, [selectedList]);

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.input}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSelectedList((prev) => (val ? [...prev.filter((mail) => mail !== val), val] : prev));
              setVal("");
            }
          }}
        />
        <button
          type="button"
          className={styles.button}
          onClick={() => {
            setSelectedList((prev) => (val ? [...prev.filter((mail) => mail !== val), val] : prev));
            setVal("");
          }}
        >
          Add
        </button>
      </div>
      <div className={styles.selectedList}>
        {selectedList.map((item) => (
          <div key={item} className={styles.item}>
            {item}
            <button
              type="button"
              className={styles.button}
              onClick={() => setSelectedList(selectedList.filter((mail) => mail !== item))}
            >
              <XMarkIcon width={14} />
            </button>
          </div>
        ))}
      </div>
      {!!errorMsg && <span className={styles.error}>{errorMsg}</span>}
    </div>
  );
};

export default AppMultiInput;
