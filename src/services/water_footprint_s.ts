import { Props, Response } from "../types/Api";

export const createNewWaterFootprint = async (
  backendApiCall: (data: Props) => Promise<Response>,
  data: any
) => {
  return await backendApiCall({
    method: "POST",
    endpoint: "water-footprint/new/",
    body: data,
  });
};

export const getWaterFootprintByCropIdAndCollectionId = async (
  backendApiCall: (data: Props) => Promise<Response>,
  collectionId: string,
  cropId: string
): Promise<Response> => {
  return await backendApiCall({
    method: "GET",
    endpoint: `water-footprint/info?collection_id=${collectionId}&crop_id=${cropId}`,
  });
};

export const getWaterFootprintSuggestion = async (
  backendApiCall: (data: Props) => Promise<Response>,
  collectionId: string,
  cropId: string
): Promise<Response> => {
  return await backendApiCall({
    method: "GET",
    endpoint: `water-footprint/suggestion-ia?collection_id=${collectionId}&crop_id=${cropId}`,
  });
};
