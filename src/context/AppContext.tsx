import React, { createContext, useContext, useEffect, useState, PropsWithChildren } from "react";
import { ApiContext } from "./ApiContext";
import { User } from "@auth0/auth0-react";
interface ContextData {
  userData: UserDataI;
  appContextIsFetching: boolean;
}
interface UserDataI {
  user: string;
  email: string;
  security: {
    identity_verified: boolean;
  };
  created_at: string;
  updated_at: string;
}
const UserDataInit: UserDataI = {
  user: "",
  email: "",
  security: {
    identity_verified: false,
  },
  created_at: "",
  updated_at: "",
};

export const AppContext = createContext<ContextData>({
  userData: UserDataInit,
  appContextIsFetching: false,
});

export const AppContextProvider: React.FC<PropsWithChildren> = (props) => {
  const { backendApiCall, tokenIsReady, userToken } = useContext(ApiContext);
  const [appContextIsFetching, setAppContextIsFetching] = useState<boolean>(true);
  const [userData, setUserData] = useState(UserDataInit);

  useEffect(() => {
    const getUserData = async () => {
      const userData = await backendApiCall({ method: "GET", endpoint: "v1/user/info" });
      if (userData.status === "error") {
        console.error(userData.message);
      } else {
        setUserData(userData.data ? userData.data : UserDataInit);
        setAppContextIsFetching(false);
      }
    };
    console.log("AppContextProvider");
    getUserData();
  }, [tokenIsReady]);

  return (
    <AppContext.Provider value={{ userData, appContextIsFetching }}>
      {props.children}
    </AppContext.Provider>
  );
};
