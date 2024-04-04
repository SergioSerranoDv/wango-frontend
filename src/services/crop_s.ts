import { ApiProps, apiResponse } from "../context/ApiContext";
import { Crop } from "../interfaces/crop";
export const createNewCrop = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  data: Crop
) => {
  return await backendApiCall({ method: "POST", endpoint: "v1/crop/new", body: data });
};
