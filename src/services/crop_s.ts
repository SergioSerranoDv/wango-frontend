import { Props, Response } from "../types/Api";
import { Crop } from "../interfaces/crop";

export const createNewCrop = async (
  backendApiCall: (data: Props) => Promise<Response>,
  data: {
    name: string;
    area: number;
    latitude: number;
    longitude: number;
    lot_id: string;
  }
) => {
  return await backendApiCall({ method: "POST", endpoint: "crop/new", body: data });
};

export const fetchPaginatedCropsByLotId = async (
  backendApiCall: (data: Props) => Promise<Response>,
  { page, limit, lotId }: { page: number; limit: number; lotId: string }
): Promise<any> => {
  return await backendApiCall({
    method: "GET",
    endpoint: `crop/paginated?page=${page}&limit=${limit}&lot_id=${lotId}`,
  });
};

export const deleteCropById = async (
  backendApiCall: (data: Props) => Promise<Response>,
  cropId: string,
  lotId: string
): Promise<any> => {
  return await backendApiCall({
    method: "DELETE",
    endpoint: `crop/delete/${cropId}`,
    body: {
      lot_id: lotId,
    },
  });
};

export const findCropById = async (
  backendApiCall: (data: Props) => Promise<Response>,
  cropId: string
): Promise<Response> => {
  return await backendApiCall({ method: "GET", endpoint: `crop/info/${cropId}` });
};

export const updateCrop = async (
  backendApiCall: (data: Props) => Promise<Response>,
  data: Crop,
  cropId: string
) => {
  return await backendApiCall({ method: "PUT", endpoint: `crop/update/${cropId}`, body: data });
};

export const saveCrop = async (
  backendApiCall: (data: Props) => Promise<Response>,
  data: Crop,
  cropId: string
) => {
  return await backendApiCall({ method: "PUT", endpoint: `crop/update/${cropId}`, body: data });
};

export const searchCrops = async (
  backendApiCall: (data: Props) => Promise<Response>,
  query: string
): Promise<any> => {
  return await backendApiCall({ method: "GET", endpoint: `crop/search?search=${query}` });
};
