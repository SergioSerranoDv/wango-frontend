import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import MainMenu from "./MainMenu";
import RegisterForm from "./RegisterForm";

export const Dashboard = () => {
  const { userData, appContextIsFetching } = useContext(AppContext);

  console.log(appContextIsFetching);

  return (
    <div>
      {appContextIsFetching ? (
        <div>Loading...</div>
      ) : userData && userData.security.identity_verified ? (
        <MainMenu />
      ) : (
        <div>
          <RegisterForm />
        </div>
      )}
    </div>
  );
};
