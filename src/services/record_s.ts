import { Props, Response } from "../types/Api";
import { Records } from "../interfaces/record";
interface PaaginationProps {
  page: number;
  limit: number;
  collection_id: string;
}

export const createNewRecords = async (
  backendApiCall: (data: Props) => Promise<Response>,
  data: Records
) => {
  return await backendApiCall({
    method: "POST",
    endpoint: "v1/collection-record/new/",
    body: data,
  });
};

export const updateRecord = async (
  backendApiCall: (data: Props) => Promise<Response>,
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
  backendApiCall: (data: Props) => Promise<Response>,
  recordId: string
): Promise<Response> => {
  return await backendApiCall({ method: "GET", endpoint: `v1/collection-record/info/${recordId}` });
};

export const fetchPaginatedRecordPerCollection = async (
  backendApiCall: (data: Props) => Promise<Response>,
  { page, limit, collection_id }: PaaginationProps
): Promise<any> => {
  return await backendApiCall({
    method: "GET",
    endpoint: `v1/collection-record/paginated?page=${page}&limit=${limit}&collection_id=${collection_id}`,
  });
};
