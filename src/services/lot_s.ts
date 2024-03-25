// lot_s.ts

import { ApiProps } from "../context/ApiContext";

// Función para guardar la información del formulario
export const saveLotInfo = async (backendApiCall: (data: ApiProps) => Promise<any>, formData: any) => {
  try {
    const { name, capacity, user } = formData;
    const requestData = { name, capacity, user };
    const response = await backendApiCall({ method: "PUT", endpoint: "v1/lot/new", body: requestData });
    if (response.status === "success") {
      return response.data; // Assumiendo que la respuesta del servidor contiene el objeto del lote creado
    } else {
      throw new Error(response.message);
    }
  } catch (error: any) { // Especifica 'error' como 'any'
    throw new Error(`Error saving lot info: ${(error as Error).message}`);
  }
};

// Función para guardar el usuario asociado al lote
export const saveLotUser = async (backendApiCall: (data: ApiProps) => Promise<any>, lotId: string, userId: string) => {
  try {
    const userLotData = {
      user: userId,
    };
    const response = await backendApiCall({ method: "PUT", endpoint: `v1/lot/user/${lotId}`, body: userLotData });
    if (response.status === "success") {
      return response.data;
    } else {
      throw new Error(response.message);
    }
  } catch (error: any) { // Especifica 'error' como 'any'
    throw new Error(`Error saving lot user: ${(error as Error).message}`);
  }
};
