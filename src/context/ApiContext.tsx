import React, { createContext, useEffect, useState, PropsWithChildren } from "react";
import { useAuth0 } from "@auth0/auth0-react";
interface apiData {
  userToken: string;
}
const ApiContext = createContext<apiData>({
  userToken: "",
});
export const ApiContextProvider: React.FC<PropsWithChildren> = (props) => {
  const { getAccessTokenSilently } = useAuth0();
  const [userToken, setUserToken] = useState<string>("");

  const getToken = async () => {
    const token = await getAccessTokenSilently();
    return token;
  };

  useEffect(() => {
    getToken()
      .then((token) => {
        console.log(token);
        setUserToken(token);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <ApiContext.Provider value={{ userToken: userToken }}>{props.children}</ApiContext.Provider>
  );
};
