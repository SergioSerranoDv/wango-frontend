import React, { createContext, useEffect, useState, PropsWithChildren } from "react";
import { Props, Response } from "../types/Api";
import { useAuth0 } from "@auth0/auth0-react";
interface apiData {
  userToken: string;
  backendApiCall: (apiData: Props) => Promise<Response>;
  serviceIsReady: boolean;
}

export const ApiContext = createContext<apiData>({
  userToken: "",
  backendApiCall: async () => {
    return new Promise(() => {});
  },
  serviceIsReady: false,
});
export const ApiContextProvider: React.FC<PropsWithChildren> = (props) => {
  const { getAccessTokenSilently } = useAuth0();
  const [serviceIsReady, setServiceIsReady] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string>("");

  const backendApiCall = async (apiData: Props): Promise<Response> => {
    if (!serviceIsReady) {
      return { data: null, status: "error", message: "Token not ready yet" };
    }
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL as string}${apiData.endpoint}`, {
        method: apiData.method,
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData.body),
      });
      const data = await res.json();
      if (data.status === "error") {
        return { data: null, status: "error", message: data.message };
      }
      return { data: data.data, status: "success", message: "success" };
    } catch (error: any) {
      return { data: null, status: "error", message: error.message };
    }
  };

  const getToken = async () => {
    const token = await getAccessTokenSilently();
    console.log(token);
    return token;
  };

  useEffect(() => {
    getToken()
      .then((token) => {
        setUserToken(token);
        setServiceIsReady(true);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <ApiContext.Provider value={{ userToken: userToken, backendApiCall, serviceIsReady }}>
      {props.children}
    </ApiContext.Provider>
  );
};
