import { UseGet } from "./UseGet";

export const useLotsData = (currentPage: number, rowsPerPage: number) => {
  return UseGet({
    endpoint: `v1/lot/paginated?page=${currentPage}&limit=${rowsPerPage}`,
  });
};
