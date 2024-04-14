import { redirect } from "react-router-dom";

export const NotificationDataInit = {
  title: "",
  description: "",
  status: "",
  redirectUrl: "",
};

export interface NotificationI {
  title: string;
  description: string;
  status: string;
  redirectUrl: string;
}
