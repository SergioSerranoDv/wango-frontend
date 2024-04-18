import { ApiProps, apiResponse } from "../context/ApiContext";
import { Collection } from "../interfaces/collection";
export const createNewCollection = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  data: Collection
) => {
  return await backendApiCall({ method: "POST", endpoint: "v1/crop/new", body: data });
};
