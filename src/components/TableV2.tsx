import React, { Dispatch, SetStateAction } from "react";
import arrowheadRight from "../assets/icons/arrowheadRight.svg";
import arrowheadLeft from "../assets/icons/arrowheadLeft.svg";
import {
  ContainerNavigationControls,
  NextArrow,
  PrevArrow,
  Table,
  TableRow,
  TableCell,
} from "../styles/TableStyles";
interface TableV2Props {
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
  columns: string[];
  columnMapping: {
    [key: string]: string;
  };
  options: {
    edit: (item: any) => void;
    delete: (item: any) => void;
  };
}
export const TableV2: React.FC<TableV2Props> = ({
  evencolor,
  oddcolor,
  data,
  columns,
  columnMapping,
  options,
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
    <div>
      <Table>
        <thead>
          <TableRow $index={-1} $evenColor={evencolor} $oddColor={oddcolor}>
            {columns.map((column: string, index: number) => (
              <TableCell key={index}>{column}</TableCell>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {data.map((item: any, index: number) => (
            <TableRow key={index} $index={index} $evenColor={evencolor} $oddColor={oddcolor}>
              {columns.map((column, colIndex) => {
                if (columnMapping[column]) {
                  return <TableCell key={colIndex}>{item[columnMapping[column]]}</TableCell>;
                }
              })}
            </TableRow>
          ))}
        </tbody>
      </Table>
      <div
        style={{
          display: "flex",
          paddingTop: 12,
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
    </div>
  );
};
