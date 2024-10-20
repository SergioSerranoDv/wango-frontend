import { useState } from "react";
import { NotificationDataInit, NotificationI } from "../interfaces/notification";

export const useNotification = () => {
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationDetails, setNotificationDetails] =
    useState<NotificationI>(NotificationDataInit);

  const triggerNotification = (
    title: string,
    description: string,
    status: string,
    redirectUrl: string = ""
  ) => {
    setNotificationDetails({ title, description, status, redirectUrl });
    setShowNotification(true);
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  return { showNotification, notificationDetails, triggerNotification, closeNotification };
};
