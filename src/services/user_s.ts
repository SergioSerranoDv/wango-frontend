import { Props } from "../types/Api";

export const updateUserData = async (backendApiCall: (data: Props) => Promise<any>) => {
  return await backendApiCall({ method: "GET", endpoint: "v1/user/info" });
};
