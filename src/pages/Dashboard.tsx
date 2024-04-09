import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import MainMenu from "./MainMenu";
import RegisterForm from "./RegisterForm";
import Loading from "../components/Loading";

export const Dashboard = () => {
  const { userData, appContextIsFetching } = useContext(AppContext);
  const { email, security } = userData;
  if (appContextIsFetching) {
    return <Loading />;
  }
  return (
    <>
      {userData && security.identity_verified ? (
        <MainMenu />
      ) : userData && userData.email !== "" ? (
        <RegisterForm
          user={{
            email: email,
          }}
        />
      ) : (
        <Loading />
      )}
    </>
  );
};
