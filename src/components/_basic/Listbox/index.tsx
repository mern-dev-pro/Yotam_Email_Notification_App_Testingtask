import React, { useState } from "react";
import classNames from "classnames";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { IOption } from "../../../utils/type";

import styles from "./style.module.scss";

type Props = {
  options: IOption[];
};

const AppListbox: React.FC<Props> = ({ options }) => {
  const [selected, setSelected] = useState(options[0]);
  return (
    <div className={styles.wrapper}>
      <Listbox value={selected} onChange={setSelected}>
        <ListboxButton className={styles.button}>
          {selected.label}
          <ChevronDownIcon className={styles.buttonIcon} aria-hidden="true" />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={classNames(
            "w-52 z-50 rounded-xl border border-gray bg-white p-1 focus:outline-none mt-0.5",
            "transition duration-100 ease-in",
          )}
        >
          {options.map((option) => (
            <ListboxOption
              key={option.value}
              value={option}
              className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white"
            >
              <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
              <div className="text-sm/6 text-black">{option.label}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};

export default AppListbox;
