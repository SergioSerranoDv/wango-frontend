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
export const updateRecord = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  data: Records,
  recordId: string
) => {
  return await backendApiCall({
    method: "PUT",
    endpoint: `v1/collection-record/update/${recordId}`,
    body: data,
  });
};
export const fetchRecordDetails = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  recordId: string
): Promise<apiResponse> => {
  return await backendApiCall({ method: "GET", endpoint: `v1/collection-record/info/${recordId}` });
};
interface PaaginationProps {
  page: number;
  limit: number;
  collection_id: string;
}
export const fetchPaginatedRecordPerCollection = async (
  backendApiCall: (data: ApiProps) => Promise<apiResponse>,
  { page, limit, collection_id }: PaaginationProps
): Promise<any> => {
  return await backendApiCall({
    method: "GET",
    endpoint: `v1/collection-record/paginated?page=${page}&limit=${limit}&collection_id=${collection_id}`,
  });
};
