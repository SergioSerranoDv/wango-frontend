import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import MainMenu from "./MainMenu";
import RegisterForm from "./RegisterForm";
import Loading from "../components/Loading";

export const Dashboard = () => {
  const { userData, appContextIsFetching } = useContext(AppContext);
  if (appContextIsFetching) {
    return <Loading />;
  }
  return (
    <div>{userData && userData.security.identity_verified ? <MainMenu /> : <RegisterForm />}</div>
  );
};
