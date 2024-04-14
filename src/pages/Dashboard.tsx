import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import MainMenu from "./MainMenu";
import RegisterForm from "./RegisterForm";
import { LoadingAnimation } from "../components/Loading";

export const Dashboard: React.FC = () => {
  const { userData, appContextIsFetching } = useContext(AppContext);
  if (appContextIsFetching) {
    return <LoadingAnimation />;
  }
  return (
    <>
      {userData && userData.security.identity_verified ? (
        <MainMenu />
      ) : (
        <RegisterForm></RegisterForm>
      )}
    </>
  );
};
