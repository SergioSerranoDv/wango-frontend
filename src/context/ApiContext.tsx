import React, { createContext, useEffect, useState, PropsWithChildren } from "react";
import { useAuth0 } from "@auth0/auth0-react";
interface apiData {
  userToken: string;
  backendApiCall: (apiData: ApiProps) => Promise<apiResponse>;
  tokenIsReady: boolean;
}

export interface ApiProps {
  method: string;
  endpoint: string;
  body?: any;
}
export interface apiResponse {
  data?: any;
  message: string;
  status: string;
}
export const ApiContext = createContext<apiData>({
  userToken: "",
  backendApiCall: async () => {
    return new Promise(() => {});
  },
  tokenIsReady: false,
});
export const ApiContextProvider: React.FC<PropsWithChildren> = (props) => {
  const { getAccessTokenSilently } = useAuth0();
  const [tokenIsReady, setTokenIsReady] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string>("");
  const backendApiCall = async (apiData: ApiProps): Promise<apiResponse> => {
    if (!tokenIsReady) {
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
      console.log(data);
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
    return token;
  };

  useEffect(() => {
    getToken()
      .then((token) => {
        setUserToken(token);
        setTokenIsReady(true);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <ApiContext.Provider value={{ userToken: userToken, backendApiCall, tokenIsReady }}>
      {props.children}
    </ApiContext.Provider>
  );
};
