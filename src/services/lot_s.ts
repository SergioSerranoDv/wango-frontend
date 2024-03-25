import { ApiProps, apiResponse } from "../context/ApiContext";
import { Lot } from "../interfaces/Lot";

export const createNewLot = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  data: Lot
) => {
  return await backendApiCall({ method: "POST", endpoint: "v1/lot/new", body: data });
};
