import React, { useContext } from "react";
import { LoadingAnimation } from "../components/Loading";
import { AppContext } from "../context/AppContext";
import MainMenu from "./MainMenu";
import { SignUp } from "./SignUp";

export const Dashboard: React.FC = () => {
  const { userData, appContextIsFetching } = useContext(AppContext);

  if (appContextIsFetching) {
    return <LoadingAnimation />;
  }
  return <>{userData && userData.security.identity_verified ? <MainMenu /> : <SignUp />}</>;
};
