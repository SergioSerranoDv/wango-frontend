import React, { createContext, useEffect, useState, PropsWithChildren } from "react";
import { useAuth0 } from "@auth0/auth0-react";
interface apiData {
  userToken: string;
  backendApiCall: (apiData: apiProps) => Promise<apiResponse>;
}
interface apiProps {
  method: string;
  endpoint: string;
  body?: string;
}
interface apiResponse {
  data: any;
  error: any;
}
export const ApiContext = createContext<apiData>({
  userToken: "",
  backendApiCall: async () => {
    return new Promise(() => {});
  },
});
export const ApiContextProvider: React.FC<PropsWithChildren> = (props) => {
  const { getAccessTokenSilently } = useAuth0();
  const [tokenIsReady, setTokenIsReady] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string>("");
  const backendApiCall = async (apiData: apiProps): Promise<apiResponse> => {
    if (!tokenIsReady) {
      return { data: null, error: "Token is not ready" };
    }
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL as string}${apiData.endpoint}`, {
        method: apiData.method,
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
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
    <ApiContext.Provider value={{ userToken: userToken, backendApiCall }}>
      {props.children}
    </ApiContext.Provider>
  );
};
