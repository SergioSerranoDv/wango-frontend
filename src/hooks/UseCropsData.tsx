import { UseGet } from "./UseGet";

export const UseCropsData = (currentPage: number, rowsPerPage: number, lotId: string) => {
  return UseGet({
    endpoint: `crop/paginated?page=${currentPage}&limit=${rowsPerPage}&lot_id=${lotId}`,
  });
};
