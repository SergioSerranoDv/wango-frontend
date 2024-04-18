import { ApiProps, apiResponse } from "../context/ApiContext";
import { Crop } from "../interfaces/crop";
export const createNewCrop = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  data: Crop
) => {
  return await backendApiCall({ method: "POST", endpoint: "v1/crop/new", body: data });
};
export const fetchPaginatedCropsByLotId = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  { page, limit, lotId }: { page: number; limit: number; lotId: string }
): Promise<any> => {
  return await backendApiCall({
    method: "GET",
    endpoint: `v1/crop/paginated?page=${page}&limit=${limit}&lot_id=${lotId}`,
  });
};

export const deleteCrop = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  cropId: string
): Promise<boolean> => {
  const response = await backendApiCall({ method: "DELETE", endpoint: "v1/crop/delete/${cropId}" });
  if (response.status === "success") {
    return true;
  }
  return false;
};

export const fetchCropDetails = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  cropId: string
): Promise<apiResponse> => {
  return await backendApiCall({ method: "GET", endpoint: `v1/crop/info/${cropId}` });
};
