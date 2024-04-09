import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
  SetStateAction,
  Dispatch,
} from "react";
import { ApiContext } from "./ApiContext";
interface ContextData {
  userData: UserDataI;
  appContextIsFetching: boolean;
  refetchData: number;
  setRefetchData: Dispatch<SetStateAction<number>>;
}
interface UserDataI {
  name: string;
  last_name: string;
  id_type: string;
  id_number: string;
  user: string;
  email: string;
  picture: string;
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
  picture: "",
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
  refetchData: 0,
  setRefetchData: () => {},
});

export const AppContextProvider: React.FC<PropsWithChildren> = (props) => {
  const { backendApiCall, serviceIsReady } = useContext(ApiContext);
  const [refetchData, setRefetchData] = useState<number>(0);
  const [appContextIsFetching, setAppContextIsFetching] = useState<boolean>(true);
  const [userData, setUserData] = useState(UserDataInit);

  useEffect(() => {
    const getUserData = async () => {
      const userData = await backendApiCall({ method: "GET", endpoint: "v1/user/info" });

      if (userData.status === "error") {
        console.error(userData.message);
      } else {
        setUserData(userData.data ? userData.data : UserDataInit);
      }
      setAppContextIsFetching(false);
    };
    if (serviceIsReady) {
      getUserData();
    }
  }, [backendApiCall, serviceIsReady, refetchData]);

  return (
    <AppContext.Provider value={{ userData, appContextIsFetching, refetchData, setRefetchData }}>
      {props.children}
    </AppContext.Provider>
  );
};
