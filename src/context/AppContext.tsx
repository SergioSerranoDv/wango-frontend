import React, { createContext } from "react";
interface apiData {
  userData: any;
}

export const AppContext = createContext<apiData>({
  userData: {},
});

export const AppContextProvider = () => {
  return <div>AppContext</div>;
};
