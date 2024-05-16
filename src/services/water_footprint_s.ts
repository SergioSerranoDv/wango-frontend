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
export const getWaterFootprintByCropIdAndCollectionId = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  collectionId: string,
  cropId: string
): Promise<apiResponse> => {
  return await backendApiCall({
    method: "GET",
    endpoint: `v1/water-footprint/info?collection_id=${collectionId}&crop_id=${cropId}`,
  });
};
export const getWaterFootprintSuggestion = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  collectionId: string,
  cropId: string
): Promise<apiResponse> => {
  return await backendApiCall({
    method: "GET",
    endpoint: `v1/water-footprint/suggestion-ia?collection_id=${collectionId}&crop_id=${cropId}`,
  });
};
