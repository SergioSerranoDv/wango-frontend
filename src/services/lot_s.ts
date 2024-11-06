import { Props, Response } from "../types/Api";

export const createNewLot = async (
  backendApiCall: (data: Props) => Promise<Response>,
  data: any
) => {
  return await backendApiCall({ method: "POST", endpoint: "lot/new", body: data });
};

export const updateLot = async (
  backendApiCall: (data: Props) => Promise<Response>,
  data: any,
  lotId: string
) => {
  return await backendApiCall({ method: "PUT", endpoint: `lot/update/${lotId}`, body: data });
};

export const fetchLotDetails = async (
  backendApiCall: (data: Props) => Promise<Response>,
  lotId: string
): Promise<Response> => {
  return await backendApiCall({ method: "GET", endpoint: `lot/info/${lotId}` });
};

export const fetchPaginatedLotsPerUser = async (
  backendApiCall: (data: Props) => Promise<Response>,
  { page, limit }: { page: number; limit: number }
): Promise<any> => {
  return await backendApiCall({
    method: "GET",
    endpoint: `lot/paginated?page=${page}&limit=${limit}`,
  });
};

export const deleteLotById = async (
  backendApiCall: (data: Props) => Promise<Response>,
  lotId: string
): Promise<any> => {
  return await backendApiCall({ method: "DELETE", endpoint: `lot/delete/${lotId}` });
};
