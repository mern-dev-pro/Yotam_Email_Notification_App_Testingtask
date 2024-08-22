"use client";
import React, { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import AppButton from "../../../../_basic/button";
import AppModal from "../../../../_module/modal";
import NotificationManager from "../notificationManager";

import styles from "./style.module.scss";

type Props = {
  id: string;
  notification: { [key: string]: any };
};

const ActionForNotification: React.FC<Props> = ({ id, notification }) => {
  const router = useRouter();
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const onDelete = async () => {
    try {
      setDeleteLoading(true);
      await fetch(`/api/notification/${id}`, { method: "DELETE" });
      toast.success("Deleted successfully");
      setOpenDelete(false);
      router.refresh();
    } catch (error) {
      toast.success("Failed to delete, try again later!");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <NotificationManager mode="update" id={id} notification={notification} />
      <button className={styles.deleteButton} onClick={() => setOpenDelete(true)}>
        <TrashIcon width={24} />
      </button>
      <AppModal isOpen={openDelete} setIsOpen={setOpenDelete} heading="Are you sure to delete this notification plan?">
        <div className={styles.modalButtons}>
          <AppButton label="Delete" variant="danger" onClick={onDelete} isPending={deleteLoading} />
          <AppButton label="Cancel" variant="primary" onClick={() => setOpenDelete(false)} />
        </div>
      </AppModal>
    </>
  );
};

export default ActionForNotification;
