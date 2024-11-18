import { Props, Response } from "../types/Api";

export const getLotsQuantityByMonth = async (
  backendApiCall: (data: Props) => Promise<Response>
): Promise<any> => {
  return await backendApiCall({
    method: "GET",
    endpoint: `v1/user/analytics/lots/quantity/by-month`,
  });
};
