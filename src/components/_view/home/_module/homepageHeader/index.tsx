"use client";
import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import AppButton from "../../../../_basic/button";
import AppDatePicker from "../../../../_basic/datePicker";
import AppListbox from "../../../../_basic/Listbox";
import AppModal from "../../../../_module/modal";
import AppMultiInput from "../../../../_basic/multiInput";
import AppTextInput from "../../../../_basic/textInput";
import { IOption } from "../../../../../utils/type";

import styles from "./style.module.scss";
import { time } from "console";

const intervalOptions: IOption[] = [
  { label: "Week", value: "week" },
  { label: "Day", value: "day" },
  { label: "Hour", value: "hour" },
];

const schema = yup.object().shape({
  interval: yup.string().required("Interval is a required field"),
  intervalDuration: yup.number().min(0),
  searchString: yup.string().required("Search string is a required field"),
  relevancyScore: yup.number().min(0),
  date: yup.date().required("Date is a required field"),
  time: yup.date().required("Time is a required field"),
  emails: yup.array().required("Emails is a required field"),
});

const HomePageHeader = () => {
  const [openModal, setOpenModal] = useState(false);

  /**
   * Configure react hook form
   */
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { interval: "week", intervalDuration: 1, relevancyScore: 0.1, emails: [] },
  });

  const onSubmit = (data: FieldValues) => {
    console.log("data: ", data);
  };

  return (
    <div className={styles.header}>
      <AppButton onClick={() => setOpenModal(true)} label="Create" icon={<PlusIcon width={24} />} />
      <AppModal heading="Create a new notification plan" isOpen={openModal} setIsOpen={setOpenModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.modalContents}>
            <Controller
              name="interval"
              control={control}
              render={({ field: { value, onChange } }) => {
                const selected = intervalOptions.find((item) => item.value === value);
                return (
                  <AppListbox
                    label="Variant"
                    options={intervalOptions}
                    value={selected ?? intervalOptions[0]}
                    onChange={(val) => {
                      onChange(val.value);
                    }}
                    errorMsg={errors.interval?.message}
                  />
                );
              }}
            />
            <div className={styles.duration}>
              <AppTextInput
                register={register("intervalDuration")}
                label="Interval"
                className={styles.duration}
                errorMsg={errors.intervalDuration?.message}
              />
            </div>
            <div>
              <Controller
                name="date"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <AppDatePicker label="Date" value={value} onChange={onChange} errorMsg={errors.date?.message} />
                  );
                }}
              />
            </div>
            <div>
              <Controller
                name="time"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <AppDatePicker
                      variant="time"
                      label="Date"
                      value={value}
                      onChange={onChange}
                      errorMsg={errors.time?.message}
                    />
                  );
                }}
              />
            </div>
            <div className={styles.searchString}>
              <AppTextInput
                type="string"
                label="Search string"
                register={register("searchString")}
                errorMsg={errors.searchString?.message}
              />
            </div>
            <div className={styles.emails}>
              <Controller
                name="emails"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <AppMultiInput label="Emails" value={value} onChange={onChange} errorMsg={errors.emails?.message} />
                  );
                }}
              />
            </div>
            <div>
              <AppTextInput
                label="Relevancy score"
                register={register("relevancyScore")}
                errorMsg={errors.relevancyScore?.message}
              />
            </div>
          </div>
          <div className={styles.panelFooter}>
            <AppButton type="submit" label="Ok" className={styles.button} />
            <AppButton
              variant="danger"
              label="Cancel"
              className={styles.button}
              onClick={() => {
                setOpenModal(false);
              }}
            />
          </div>
        </form>
      </AppModal>
    </div>
  );
};

export default HomePageHeader;
