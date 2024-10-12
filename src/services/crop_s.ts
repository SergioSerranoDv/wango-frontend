import { Props, Response } from "../types/Api";
import { Crop } from "../interfaces/crop";

export const createNewCrop = async (
  backendApiCall: (data: Props) => Promise<Response>,
  data: Crop
) => {
  return await backendApiCall({ method: "POST", endpoint: "v1/crop/new", body: data });
};

export const fetchPaginatedCropsByLotId = async (
  backendApiCall: (data: Props) => Promise<Response>,
  { page, limit, lotId }: { page: number; limit: number; lotId: string }
): Promise<any> => {
  return await backendApiCall({
    method: "GET",
    endpoint: `v1/crop/paginated?page=${page}&limit=${limit}&lot_id=${lotId}`,
  });
};

export const deleteCrop = async (
  backendApiCall: (data: Props) => Promise<Response>,
  cropId: string
): Promise<boolean> => {
  const response = await backendApiCall({ method: "DELETE", endpoint: `v1/crop/delete/${cropId}` });
  if (response.status === "success") {
    return true;
  }
  return false;
};

export const fetchCropDetails = async (
  backendApiCall: (data: Props) => Promise<Response>,
  cropId: string
): Promise<Response> => {
  return await backendApiCall({ method: "GET", endpoint: `v1/crop/info/${cropId}` });
};

export const updateCrop = async (
  backendApiCall: (data: Props) => Promise<Response>,
  data: Crop,
  cropId: string
) => {
  return await backendApiCall({ method: "PUT", endpoint: `v1/crop/update/${cropId}`, body: data });
};

export const saveCrop = async (
  backendApiCall: (data: Props) => Promise<Response>,
  data: Crop,
  cropId: string
) => {
  return await backendApiCall({ method: "PUT", endpoint: `v1/crop/update/${cropId}`, body: data });
};
