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
export const fetchPaginatedRecordPerCollection = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  {
    page: page,
    limit: limit,
    collection_id: collection_id,
  }: { page: number; limit: number; collection_id: string }
): Promise<any> => {
  return await backendApiCall({
    method: "GET",
    endpoint: `v1/collection-record/paginated?page=${page}&limit=${limit}&collection_id=${collection_id}`,
  });
};
