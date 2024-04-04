import React, { createContext, useContext, useEffect, useState, PropsWithChildren } from "react";
import { ApiContext } from "./ApiContext";
interface ContextData {
  userData: UserDataI;
  appContextIsFetching: boolean;
  refetchData: boolean;
  setRefetchData: (value: boolean) => void;
}
interface UserDataI {
  name: string;
  last_name: string;
  id_type: string;
  id_number: string;
  user: string;
  email: string;
  security: {
    identity_verified: boolean;
  };
  created_at: string;
  updated_at: string;
  environment_variables: {
    fraction: number;
    maximum_quantity: number;
    natural_amount_chemical: number;
  };
}
const UserDataInit: UserDataI = {
  name: "",
  last_name: "",
  id_type: "",
  id_number: "",
  user: "",
  email: "",
  security: {
    identity_verified: false,
  },
  created_at: "",
  updated_at: "",
  environment_variables: {
    fraction: 0,
    maximum_quantity: 50,
    natural_amount_chemical: 0.5,
  },
};

export const AppContext = createContext<ContextData>({
  userData: UserDataInit,
  appContextIsFetching: false,
  refetchData: false,
  setRefetchData: () => {},
});

export const AppContextProvider: React.FC<PropsWithChildren> = (props) => {
  const { backendApiCall, tokenIsReady, userToken } = useContext(ApiContext);
  const [refetchData, setRefetchData] = useState<boolean>(false);
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
  }, [tokenIsReady, refetchData]);

  return (
    <AppContext.Provider value={{ userData, appContextIsFetching, refetchData, setRefetchData }}>
      {props.children}
    </AppContext.Provider>
  );
};
