import { ApiProps, apiResponse } from "../context/ApiContext";
import { Lot } from "../interfaces/Lot";

export const createNewLot = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  data: Lot
) => {
  return await backendApiCall({ method: "POST", endpoint: "v1/lot/new", body: data });
};

export const saveLot = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  data: Lot,
  lotId: string
) => {
  return await backendApiCall({ method: "PUT", endpoint: `v1/lot/update/${lotId}`, body: data });
};

export const fetchLotDetails = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  lotId: string
): Promise<Lot | null> => {
  const response = await backendApiCall({ method: "GET", endpoint: `v1/lot/info/${lotId}` });
  if (response.status === "success" && response.data) {
    return response.data as Lot;
  }
  return null;
};

export const fetchPaginatedLotsPerUser = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  { page: page, limit: limit }: { page: number; limit: number }
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
  const response = await backendApiCall({ method: "DELETE", endpoint: "v1/lot/delete/${lotId}" });
  if (response.status === "success") {
    return true;
  }
  return false;
};
