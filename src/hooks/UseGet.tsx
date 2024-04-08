import React, { useState, useEffect, useContext } from "react";
import { ApiContext } from "../context/ApiContext";
interface UseGetResponse {
  data: any;
  loading: boolean;
  setRefetch: React.Dispatch<React.SetStateAction<number>>;
}

export const UseGet = (service: any): UseGetResponse => {
  const { backendApiCall, serviceIsReady } = useContext(ApiContext);
  const [data, setData] = useState({});
  const [refetch, setRefetch] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  console.log(serviceIsReady);
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data");
      try {
        const response = await service;
        console.log(response);
        if (response.status === "success") {
          setData(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (serviceIsReady) fetchData();
  }, [backendApiCall, serviceIsReady, refetch]);

  return {
    data,
    loading: loading,
    setRefetch: setRefetch,
  };
};
