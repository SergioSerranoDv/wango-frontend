import { UseGet } from "./UseGet";

export const useLotsData = (currentPage: number, rowsPerPage: number) => {
  return UseGet({
    endpoint: `lot/paginated?page=${currentPage}&limit=${rowsPerPage}`,
  });
};
