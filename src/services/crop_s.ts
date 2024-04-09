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
