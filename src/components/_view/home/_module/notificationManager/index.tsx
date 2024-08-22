"use client";
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as yup from "yup";

import AppButton from "../../../../_basic/button";
import AppDatePicker from "../../../../_basic/datePicker";
import AppListbox from "../../../../_basic/Listbox";
import AppModal from "../../../../_module/modal";
import AppMultiInput from "../../../../_basic/multiInput";
import AppTextInput from "../../../../_basic/textInput";
import AppCheckbox from "../../../../_basic/checkbox";
import { days } from "../../../../../utils/function";
import { IOption } from "../../../../../utils/type";

import styles from "./style.module.scss";

const intervalOptions: IOption[] = [
  { label: "Week", value: "week" },
  { label: "Day", value: "day" },
];

const schema = yup.object().shape({
  interval: yup.string().required("Interval is a required field"),
  intervalDuration: yup.number().min(0),
  searchString: yup.string().required("Search string is a required field"),
  relevancyScore: yup.number().min(0),
  day: yup
    .array(yup.string())
    .when("interval", ([interval], schema) =>
      interval === "week" ? schema.min(1, "Email is a required field") : schema,
    ),
  date: yup
    .date()
    .when("interval", ([interval], schema) =>
      interval === "day" ? schema.required("Date is required field") : schema,
    ),
  time: yup.date(),
  emails: yup
    .array(yup.string().email())
    .min(1, "Email is a required field")
    .max(1, "You can use only one email for current version")
    .required("Emails is a required field"),
});

type Props = {
  mode?: "create" | "update";
  id?: string;
  notification?: { [key: string]: any };
};

const NotificationManager: React.FC<Props> = ({ mode = "create", id = "", notification }) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * Configure react hook form
   */
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { interval: "week", intervalDuration: 1, relevancyScore: 1 },
  });
  const watchInterval = watch("interval");

  /**
   * Prevent enter key event for form
   * @param e form event
   */
  const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") e.preventDefault();
  };

  /**
   * Create a new notification plan (record a notification to mongoDB)
   * @param data form data
   */
  const onSubmit = async (data: FieldValues) => {
    try {
      setLoading(true);
      var dateForNextDay = new Date();
      if (data.interval === "week") {
        const mappedPlannedDays = (data.day ?? []).map((day: string) => days.findIndex((item) => day === item)).sort();
        const currentDay = dateForNextDay.getDay();
        const nearestNextDay = mappedPlannedDays?.find((item: number) => {
          if (item > currentDay) return true;
          else false;
        });
        dateForNextDay.setDate(
          dateForNextDay.getDate() + ((nearestNextDay ?? mappedPlannedDays[0] + 7 - dateForNextDay.getDay()) % 7),
        );
      }

      const body = {
        ...data,
        time: data.time ? new Date(data.time) : new Date(),
        date: data.date ? new Date(data.date) : new Date(),
        plannedDate: data.date ? new Date(data.date) : dateForNextDay,
      };
      if (mode === "update" && id) {
        await fetch(`/api/notification/${id}`, { method: "PUT", body: JSON.stringify(body) });
      } else {
        await fetch("/api/notification", { method: "POST", body: JSON.stringify(body) });
      }
      toast.success("A notification plan is saved!");
      setOpenModal(false);
      router.refresh();
    } catch (error) {
      toast.error("Failed to create! try again later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mode === "update" && id) {
      reset({
        interval: notification?.interval,
        intervalDuration: notification?.intervalDuration,
        date: notification?.date,
        searchString: notification?.searchString,
        relevancyScore: notification?.relevancyScore,
        emails: notification?.emails ?? [],
        day: notification?.day ?? [],
        time: notification?.time,
      });
    }
  }, [id]);

  return (
    <div
      className={classNames(styles.header, {
        [styles.headerCreate]: mode === "create",
        [styles.headerUpdate]: mode === "update",
      })}
    >
      {mode === "update" ? (
        <button className={styles.editButton}>
          <PencilIcon width={20} onClick={() => setOpenModal(true)} />
        </button>
      ) : (
        <AppButton onClick={() => setOpenModal(true)} label="Create" icon={<PlusIcon width={24} />} />
      )}
      <AppModal
        heading={`${mode === "update" ? "Update" : "Create"} a new notification plan`}
        isOpen={openModal}
        setIsOpen={setOpenModal}
      >
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => checkKeyDown(e)}>
          <div className={styles.modalContents}>
            <Controller
              name="interval"
              control={control}
              render={({ field: { value, onChange } }) => {
                const selected = intervalOptions.find((item) => item.value === value);
                return (
                  <AppListbox
                    label="Interval unit"
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
              {watchInterval !== "week" && (
                <AppTextInput
                  register={register("intervalDuration")}
                  label="Length"
                  className={styles.duration}
                  errorMsg={errors.intervalDuration?.message}
                />
              )}
            </div>
            {watchInterval === "week" && (
              <div className={styles.daySelector}>
                {days.map((day) => {
                  return (
                    <Controller
                      key={day}
                      name="day"
                      control={control}
                      render={({ field: { value, onChange } }) => {
                        return (
                          <AppCheckbox
                            name="day"
                            value={day}
                            label={day}
                            checked={!!(value ?? []).find((item) => item === day)}
                            onChange={(val) => {
                              onChange(
                                val
                                  ? [...(value ?? []), day]
                                  : ((value as string[]) ?? []).filter((item: string) => item !== day),
                              );
                            }}
                          />
                        );
                      }}
                    />
                  );
                })}
              </div>
            )}
            {watchInterval !== "week" && (
              <Controller
                name="date"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <AppDatePicker
                      disabled={watchInterval === "week"}
                      label="Date"
                      value={value}
                      onChange={onChange}
                      errorMsg={errors.date?.message}
                    />
                  );
                }}
              />
            )}

            <div>
              <Controller
                name="time"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <AppDatePicker
                      variant="time"
                      label="Time"
                      value={value}
                      onChange={onChange}
                      errorMsg={errors.time?.message}
                      disabled
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
                    <AppMultiInput
                      label="Emails"
                      value={value as string[]}
                      onChange={onChange}
                      errorMsg={errors.emails?.message}
                    />
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
            <AppButton type="submit" label="Ok" className={styles.button} isPending={loading} />
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

export default NotificationManager;
