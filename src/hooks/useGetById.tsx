import { useEffect, useState, useContext } from "react";
import { ApiContext } from "../context/ApiContext";

interface GetByIdProps {
  endpoint: string;
}

export const useGetById = (props: GetByIdProps) => {
  const { backendApiCall, serviceIsReady } = useContext(ApiContext);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [refetch, setRefetch] = useState<number>(0);

  useEffect(() => {
    if (serviceIsReady) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await backendApiCall({
            method: "GET",
            endpoint: `${props.endpoint}`,
          });
          if (response.status === "success") {
            setData(response.data);
          } else {
            setError(response.message);
          }
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [backendApiCall, serviceIsReady, refetch]);

  return { data, loading, setRefetch, error };
};
