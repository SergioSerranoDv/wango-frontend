import { ApiProps, apiResponse } from "../context/ApiContext";

export const createNewWaterFootprint = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  data: any
) => {
  return await backendApiCall({
    method: "POST",
    endpoint: "v1/water-footprint/new/",
    body: data,
  });
};
export const getWaterFootprintByCollectionId = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  collectionId: string
): Promise<apiResponse> => {
  return await backendApiCall({
    method: "GET",
    endpoint: `v1/water-footprint/info/${collectionId}`,
  });
};
