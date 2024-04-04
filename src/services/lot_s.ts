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
  id?: string // ID del lote para edición
) => {
  let endpoint = "v1/lot/new";
  if (id) {
    endpoint = `v1/lot/update/${id}`;
  }

  return await backendApiCall({ method: "POST", endpoint, body: data });
};

export const fetchLotDetails = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  lotId: string
): Promise<Lot | null> => {
  const response = await backendApiCall({ method: "GET", endpoint: `v1/lot/${lotId}` });
  if (response.status === "success") {
    return response.data as Lot;
  }
  return null;
};

export const fetchLotsPerUser = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>
): Promise<Lot[] | null> => {
  const response = await backendApiCall({ method: "GET", endpoint: "v1/lot/user" });
  if (response.status === "success") {
    return response.data as Lot[];
  }
  return null;
};