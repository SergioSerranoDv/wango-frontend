import { ApiProps, apiResponse } from "../context/ApiContext";
import { Collection } from "../interfaces/collection";
export const createNewCollection = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  data: Collection
) => {
  return await backendApiCall({
    method: "POST",
    endpoint: "v1/collection/new/",
    body: data,
  });
};
export const getCollectionByCropId = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  cropId: string
): Promise<apiResponse> => {
  return await backendApiCall({ method: "GET", endpoint: `v1/collection/info/crop/${cropId}` });
};
