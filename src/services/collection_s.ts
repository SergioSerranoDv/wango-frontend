import { Props, Response } from "../types/Api";

export const createNewCollection = async (
  backendApiCall: (data: Props) => Promise<Response>,
  data: {
    crop_id: string;
    name: string;
  }
) => {
  return await backendApiCall({
    method: "POST",
    endpoint: "collection/new/",
    body: data,
  });
};

export const getCollectionByCropId = async (
  backendApiCall: (data: Props) => Promise<Response>,
  cropId: string
): Promise<Response> => {
  return await backendApiCall({ method: "GET", endpoint: `v1/collection/info/crop/${cropId}` });
};

export const findCollectionById = async (
  backendApiCall: (data: Props) => Promise<Response>,
  collectionId: string
): Promise<Response> => {
  return await backendApiCall({ method: "GET", endpoint: `v1/collection/info/${collectionId}` });
};

interface PaaginationProps {
  page: number;
  limit: number;
  record_id: string;
}

export const fetchPaginatedCollectionPerCollection = async (
  backendApiCall: (data: Props) => Promise<Response>,
  { page, limit, record_id }: PaaginationProps
): Promise<any> => {
  return await backendApiCall({
    method: "GET",
    endpoint: `v1/collection/info/crop/${record_id}/paginated?page=${page}&limit=${limit}`,
  });
};

export const updateCollectionStatus = async (
  backendApiCall: (data: Props) => Promise<Response>,
  collectionId: string,
  data: any
): Promise<any> => {
  return await backendApiCall({
    method: "PUT",
    endpoint: `v1/collection/update/status/${collectionId}`,
    body: data,
  });
};

export const updateCollection = async (
  backendApiCall: (data: Props) => Promise<Response>,
  collectionId: string,
  data: any
): Promise<any> => {
  return await backendApiCall({
    method: "PUT",
    endpoint: `v1/collection/update/${collectionId}`,
    body: data,
  });
};

export const searchCollections = async (
  backendApiCall: (data: Props) => Promise<Response>,
  query: string
): Promise<any> => {
  return await backendApiCall({ method: "GET", endpoint: `v1/collection/search?search=${query}` });
};
