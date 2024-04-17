import React, { useState, useEffect, useContext } from "react";
import { ApiContext } from "../context/ApiContext";
interface UseGetResponse {
  data: any;
  loading: boolean;
  setRefetch: React.Dispatch<React.SetStateAction<number>>;
}

export const UseGet = (props: any): UseGetResponse => {
  const { backendApiCall, serviceIsReady } = useContext(ApiContext);
  const [data, setData] = useState({});
  const [refetch, setRefetch] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (serviceIsReady) {
      const fetchData = async () => {
        try {
          const response = await backendApiCall({
            method: "GET",
            endpoint: `${props.endpoint}`,
          });
          if (response.status === "success") {
            setData(response.data);
            setLoading(false);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [backendApiCall, serviceIsReady, refetch]);

  return {
    data,
    loading: loading,
    setRefetch: setRefetch,
  };
};
