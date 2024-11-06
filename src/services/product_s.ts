import { Props, Response } from "../types/Api";

export const updateProductById = async (
  backendApiCall: (data: Props) => Promise<Response>,
  data: any,
  productId: string
) => {
  return await backendApiCall({
    method: "PUT",
    endpoint: `products/${productId}`,
    body: data,
  });
};

export const createProduct = async (
  backendApiCall: (data: Props) => Promise<Response>,
  data: any
) => {
  return await backendApiCall({
    method: "POST",
    endpoint: "products",
    body: data,
  });
};

export const deleteProductById = async (
  backendApiCall: (data: Props) => Promise<Response>,
  productId: string
) => {
  return await backendApiCall({
    method: "DELETE",
    endpoint: `products/${productId}`,
  });
};
