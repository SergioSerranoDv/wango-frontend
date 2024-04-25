import { ApiProps, apiResponse } from "../context/ApiContext";
import { LotI } from "../interfaces/Lot";

export const createNewLot = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  data: LotI
) => {
  return await backendApiCall({ method: "POST", endpoint: "v1/lot/new", body: data });
};

export const updateLot = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  data: LotI,
  lotId: string
) => {
  return await backendApiCall({ method: "PUT", endpoint: `v1/lot/update/${lotId}`, body: data });
};

export const fetchLotDetails = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  lotId: string
): Promise<apiResponse> => {
  return await backendApiCall({ method: "GET", endpoint: `v1/lot/info/${lotId}` });
};

export const fetchPaginatedLotsPerUser = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  { page, limit }: { page: number; limit: number }
): Promise<any> => {
  return await backendApiCall({
    method: "GET",
    endpoint: `v1/lot/paginated?page=${page}&limit=${limit}`,
  });
};

export const deleteLot = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  lotId: string
): Promise<boolean> => {
  const response = await backendApiCall({ method: "DELETE", endpoint: `v1/lot/delete/${lotId}` });
  if (response.status === "success") {
    return true;
  }
  return false;
};
