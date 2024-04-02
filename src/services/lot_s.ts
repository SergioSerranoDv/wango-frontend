import { ApiProps, apiResponse } from "../context/ApiContext";
import { Lot } from "../interfaces/Lot";

export const createNewLot = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  data: Lot
) => {
  return await backendApiCall({ method: "POST", endpoint: "v1/lot/new", body: data });
};

export const fetchLotDetails = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  userId: string
): Promise<Lot[] | null> => {
  try {
    const response = await backendApiCall({ method: "GET", endpoint: `v1/lot/user/${userId}` });
    if (response.status === "success") {
      return response.data as Lot[];
    } else {
      console.error("Failed to fetch lot details:", response.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching lot details:", error);
    return null;
  }
};


export const saveLot = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  data: Lot,
  lotId: string
) => {
  return await backendApiCall({ method: "PUT", endpoint: `v1/lot/update/${lotId}`, body: data });
};