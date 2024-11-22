import { useState } from "react";

export const UsePagination = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  return {
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
  };
};
