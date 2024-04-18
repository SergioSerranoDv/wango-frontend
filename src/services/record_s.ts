import { ApiProps, apiResponse } from "../context/ApiContext";
import { Records } from "../interfaces/record";
export const createNewRecords = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  data: Records
) => {
  return await backendApiCall({
    method: "POST",
    endpoint: "v1/collection-record/new/",
    body: data,
  });
};
