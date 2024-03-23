import { ApiProps } from "../context/ApiContext";
export const updateUserData = async (backendApiCall: (data: ApiProps) => Promise<any>) => {
  return await backendApiCall({ method: "GET", endpoint: "v1/user/info" });
};
