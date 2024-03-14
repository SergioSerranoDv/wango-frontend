import React, { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
export const Dahsboard = () => {
  const { backendApiCall } = useContext(ApiContext);
  const getGreetingFromApi = async () => {
    const res = await backendApiCall({ method: "GET", endpoint: "v1/" });
    console.log(res);
  };

  return (
    <div>
      Dahsboard
      <button onClick={getGreetingFromApi}>Get Greeting</button>
    </div>
  );
};
