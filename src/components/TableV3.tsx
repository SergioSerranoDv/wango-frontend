import React, { Dispatch, SetStateAction } from "react";
import arrowheadRight from "../assets/icons/arrowheadRight.svg";
import arrowheadLeft from "../assets/icons/arrowheadLeft.svg";
import { Button } from "../styles/components/tables/TableV3";
import {
  ContainerNavigationControls,
  NextArrow,
  PrevArrow,
  Table,
  TableRow,
  TableCell,
} from "../styles/TableStyles";
interface TableV1Props {
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
  actions: {
    update: {
      icon: string;
      action: (item: any) => void;
    };
    delete?: {
      icon: string;
      action: (item: any) => void;
    };
  };
}
export const TableV3: React.FC<TableV1Props> = ({
  evencolor,
  oddcolor,
  data,
  columns,
  columnMapping,
  actions,
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
          <TableRow index={-1} evenColor={evencolor} oddColor={oddcolor}>
            {columns.map((column: string, index: number) => (
              <TableCell key={index}>{column}</TableCell>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {data &&
            data.map((item: any, index: number) => (
              <TableRow key={index} index={index} evenColor={evencolor} oddColor={oddcolor}>
                <TableCell>{index + 1}</TableCell>
                {columns.map((column, colIndex) => {
                  if (columnMapping[column]) {
                    return <TableCell key={colIndex}>{item[columnMapping[column]]}</TableCell>;
                  }
                })}

                <TableCell>
                  {item.status === "in_progress" ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Button onClick={() => actions.update.action(item)}>
                        <img width={18} src={actions.update.icon} alt="Update" />
                      </Button>
                      <span>{item.status}</span>
                    </div>
                  ) : (
                    <button
                      style={{
                        background: "none",
                        border: "none",
                      }}
                      onClick={() => actions.update.action(item)}
                    >
                      <svg
                        width="19"
                        height="20"
                        viewBox="0 0 19 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_765_1125)">
                          <path
                            d="M1.34071 0.0555973C0.709892 0.196243 0.189274 0.735384 0.0562695 1.39173C0.00686784 1.61832 -0.000732422 2.82162 -0.000732422 9.53353C-0.000732422 14.6163 0.0144681 17.4839 0.0372689 17.6206C0.151273 18.2614 0.603488 18.781 1.24951 19.0154C1.40912 19.074 1.99814 19.0818 7.59953 19.0896C11.4567 19.0974 13.9001 19.0896 14.1091 19.0662C14.6222 19.0076 14.8654 18.8435 15.0782 18.4137L15.158 18.2535L14.8388 17.9293C14.607 17.691 14.5044 17.6128 14.455 17.6324C14.4208 17.6441 11.5175 17.6558 8.00614 17.6558C0.922699 17.6558 1.48512 17.6792 1.40532 17.394C1.37491 17.2886 1.36731 14.9757 1.37491 9.44367L1.38631 1.63786L1.49272 1.53237L1.59532 1.42298L7.68693 1.41126C11.9697 1.40345 13.8165 1.41126 13.9153 1.44252C13.9951 1.46596 14.0787 1.52456 14.1053 1.57144C14.1433 1.63786 14.1586 2.53252 14.1738 5.6736L14.1928 9.69371L14.5614 9.82263C14.7628 9.89296 15.0592 10.0297 15.2226 10.1313C15.3822 10.2289 15.519 10.311 15.5266 10.311C15.5342 10.311 15.5418 8.32632 15.5418 5.90019C15.5418 0.94635 15.5608 1.27062 15.2568 0.8018C15.0022 0.407211 14.5918 0.125919 14.1395 0.0360622C14.0065 0.0126228 11.8139 -0.00300407 7.75533 0.000902176C2.70116 0.000902176 1.53452 0.0126228 1.34071 0.0555973Z"
                            fill="black"
                            fillOpacity="0.7"
                          />
                          <path
                            d="M2.62894 5.12294L2.64034 5.83789H6.97249H11.3046L11.316 5.12294L11.3236 4.4119H6.97249H2.62134L2.62894 5.12294Z"
                            fill="black"
                            fillOpacity="0.7"
                          />
                          <path
                            d="M2.62134 9.19765V9.92041H6.97249H11.3236V9.19765V8.47489H6.97249H2.62134V9.19765Z"
                            fill="black"
                            fillOpacity="0.7"
                          />
                          <path
                            d="M12.5511 10.5885C11.8519 10.6588 11.1982 10.9909 10.6928 11.53C10.1152 12.1434 9.83778 12.8427 9.83398 13.6905C9.83398 14.2453 9.90999 14.6008 10.1456 15.0969C10.5446 15.9408 11.202 16.4995 12.1027 16.7652C12.3497 16.8355 12.4941 16.8511 12.8817 16.8472C13.4023 16.8433 13.7633 16.7691 14.1813 16.5776L14.4093 16.4721L16.1232 18.2341L17.8409 20L18.4223 19.4062L18.9999 18.8084L17.286 17.0464L15.5684 15.2806L15.6862 14.9954C16.0206 14.1632 16.0358 13.3311 15.7318 12.5536C15.2226 11.2409 13.9305 10.4439 12.5511 10.5885ZM13.4251 11.9324C13.6987 12.0145 13.8887 12.1317 14.1281 12.3583C14.8768 13.0732 14.8958 14.2765 14.1699 15.0344C13.8355 15.3821 13.4061 15.558 12.8817 15.554C12.3269 15.554 11.9051 15.3665 11.5554 14.9758C11.0386 14.3976 10.9284 13.628 11.259 12.913C11.5174 12.3505 12.0723 11.9324 12.6537 11.8621C12.8475 11.8348 13.2275 11.8699 13.4251 11.9324Z"
                            fill="black"
                            fillOpacity="0.7"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_765_1125">
                            <rect width="19" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  )}
                </TableCell>
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
