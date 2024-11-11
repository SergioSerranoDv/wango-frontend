import React, { Dispatch, SetStateAction } from "react";
import arrowheadLeft from "../../assets/icons/arrowheadLeft.svg";
import arrowheadRight from "../../assets/icons/arrowheadRight.svg";
import {
  ContainerNavigationControls,
  NextArrow,
  PrevArrow,
  Table,
  TableRow,
  TableCell,
  TableContainer,
} from "../../styles/TableStyles";

interface TableV1Props {
  columns: any;
  title?: string;
  evencolor: string;
  oddcolor: string;
  data: any[];
  pagination: {
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    rowsPerPage: number;
    setRowsPerPage: Dispatch<SetStateAction<number>>;
    setRefetch: Dispatch<SetStateAction<number>>;
    totalPages: number;
  };
}
export const TableV1: React.FC<TableV1Props> = ({
  title,
  evencolor,
  oddcolor,
  data,
  columns,
  pagination,
}) => {
  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    pagination.setRowsPerPage(parseInt(event.target.value));
    pagination.setCurrentPage(1);
    pagination.setRefetch((prev) => prev + 1);
  };

  const handleNextPage = async () => {
    pagination.setCurrentPage((prev: number) => prev + 1);
    pagination.setRefetch((prev: number) => prev + 1);
  };

  const handlePreviousPage = async () => {
    pagination.setCurrentPage((prev: number) => prev - 1);
    pagination.setRefetch((prev: number) => prev + 1);
  };
  return (
    <TableContainer>
      <span style={{ color: "#ffb032" }}>{title}</span>
      <Table style={{ marginTop: "2rem" }}>
        <thead style={{ borderRadius: "16px" }}>
          <TableRow $index={-1} $evenColor={evencolor} $oddColor={oddcolor}>
            {columns.map((column: any, index: number) => (
              <TableCell key={index}>{column.title}</TableCell>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {data.map((item: any, index: number) => (
            <TableRow key={index} $index={index} $evenColor={evencolor} $oddColor={oddcolor}>
              {columns.map((column: any, index: number) => (
                <TableCell key={index}>{column.render(item)}</TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>
      <div
        style={{
          display: "flex",
          marginTop: "1rem",
          paddingTop: "2rem",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <select value={pagination.rowsPerPage} onChange={handleLimitChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div style={{ display: "flex" }}>
          <ContainerNavigationControls>
            <PrevArrow onClick={handlePreviousPage} disabled={pagination.currentPage === 1}>
              <img
                src={arrowheadLeft}
                width={16}
                height={16}
                style={{ width: 16, height: 16 }}
                alt="Previous"
              />
            </PrevArrow>
            <NextArrow
              onClick={handleNextPage}
              disabled={pagination.currentPage === pagination.totalPages}
            >
              <img
                src={arrowheadRight}
                width={16}
                height={16}
                style={{ width: 16, height: 16 }}
                alt="Next"
              />
            </NextArrow>
          </ContainerNavigationControls>
          <span>
            {pagination.currentPage} of {pagination.totalPages}
          </span>
        </div>
      </div>
    </TableContainer>
  );
};
