import React, { Dispatch, SetStateAction } from "react";
import { Table, TableRow, TableCell } from "../styles/LotsTableStyles";
import arrowheadLeft from "../assets/icons/arrowheadLeft.svg";
import arrowheadRight from "../assets/icons/arrowheadRight.svg";
import { DivIdentification } from "../styles/FormStyles";
interface TableV1Props {
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
export const TableV1: React.FC<TableV1Props> = ({ data, columns, options, pagination }) => {
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
          <TableRow index={-1}>
            {columns.map((column: string, index: number) => (
              <TableCell key={index}>{column}</TableCell>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {data &&
            data.map((item: any, index: number) => (
              <TableRow key={index} index={index}>
                <TableCell>{index + 1}</TableCell>
                {columns.map((column, colIndex) => {
                  if (columnMapping[column]) {
                    return <TableCell key={colIndex}>{item[columnMapping[column]]}</TableCell>;
                  }
                })}
                <TableCell>
                  <button onClick={() => options.edit(item)}>
                    <svg
                      width="19"
                      height="20"
                      viewBox="0 0 19 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_765_1125)">
                        <path
                          d="M1.34071 0.0555973C0.709892 0.196243 0.189274 0.735384 0.0562695 1.39173C0.00686784 1.61832 -0.000732422 2.82162 -0.000732422 9.53353C-0.000732422 14.6163 0.0144681 17.4839 0.0372689 17.6206C0.151273 18.2614 0.603488 18.781 1.24951 19.0154C1.40912 19.074 1.99814 19.0818 7.59953 19.0896C11.4567 19.0974 13.9001 19.0896 14.1091 19.0662C14.6222 19.0076 14.8654 18.8435 15.0782 18.4137L15.158 18.2535L14.8388 17.9293C14.607 17.691 14.5044 17.6128 14.455 17.6324C14.4208 17.6441 11.5175 17.6558 8.00614 17.6558C0.922699 17.6558 1.48512 17.6792 1.40532 17.394C1.37491 17.2886 1.36731 14.9757 1.37491 9.44367L1.38631 1.63786L1.49272 1.53237L1.59532 1.42298L7.68693 1.41126C11.9697 1.40345 13.8165 1.41126 13.9153 1.44252C13.9951 1.46596 14.0787 1.52456 14.1053 1.57144C14.1433 1.63786 14.1586 2.53252 14.1738 5.6736L14.1928 9.69371L14.5614 9.82263C14.7628 9.89296 15.0592 10.0297 15.2226 10.1313C15.3822 10.2289 15.519 10.311 15.5266 10.311C15.5342 10.311 15.5418 8.32632 15.5418 5.90019C15.5418 0.94635 15.5608 1.27062 15.2568 0.8018C15.0022 0.407211 14.5918 0.125919 14.1395 0.0360622C14.0065 0.0126228 11.8139 -0.00300407 7.75533 0.000902176C2.70116 0.000902176 1.53452 0.0126228 1.34071 0.0555973Z"
                          fill="black"
                          fill-opacity="0.7"
                        />
                        <path
                          d="M2.62894 5.12294L2.64034 5.83789H6.97249H11.3046L11.316 5.12294L11.3236 4.4119H6.97249H2.62134L2.62894 5.12294Z"
                          fill="black"
                          fill-opacity="0.7"
                        />
                        <path
                          d="M2.62134 9.19765V9.92041H6.97249H11.3236V9.19765V8.47489H6.97249H2.62134V9.19765Z"
                          fill="black"
                          fill-opacity="0.7"
                        />
                        <path
                          d="M12.5511 10.5885C11.8519 10.6588 11.1982 10.9909 10.6928 11.53C10.1152 12.1434 9.83778 12.8427 9.83398 13.6905C9.83398 14.2453 9.90999 14.6008 10.1456 15.0969C10.5446 15.9408 11.202 16.4995 12.1027 16.7652C12.3497 16.8355 12.4941 16.8511 12.8817 16.8472C13.4023 16.8433 13.7633 16.7691 14.1813 16.5776L14.4093 16.4721L16.1232 18.2341L17.8409 20L18.4223 19.4062L18.9999 18.8084L17.286 17.0464L15.5684 15.2806L15.6862 14.9954C16.0206 14.1632 16.0358 13.3311 15.7318 12.5536C15.2226 11.2409 13.9305 10.4439 12.5511 10.5885ZM13.4251 11.9324C13.6987 12.0145 13.8887 12.1317 14.1281 12.3583C14.8768 13.0732 14.8958 14.2765 14.1699 15.0344C13.8355 15.3821 13.4061 15.558 12.8817 15.554C12.3269 15.554 11.9051 15.3665 11.5554 14.9758C11.0386 14.3976 10.9284 13.628 11.259 12.913C11.5174 12.3505 12.0723 11.9324 12.6537 11.8621C12.8475 11.8348 13.2275 11.8699 13.4251 11.9324Z"
                          fill="black"
                          fill-opacity="0.7"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_765_1125">
                          <rect width="19" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                  <button onClick={() => options.delete(item._id)}>
                    <svg
                      width="19"
                      height="21"
                      viewBox="0 0 19 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_765_1111)">
                        <path
                          d="M7.49012 0.0687771C7.11012 0.159004 6.7347 0.359961 6.46458 0.614235C6.01133 1.04076 5.83735 1.47548 5.83735 2.18499V2.62381L3.60771 2.63611L1.37349 2.64842L1.06675 2.77966C0.640964 2.96011 0.375422 3.18977 0.169398 3.56298L0 3.87467V5.33879C0 6.7537 0.00457831 6.80701 0.0961446 6.91774C0.279277 7.13921 0.416627 7.19662 0.782892 7.21303L1.12169 7.22943V7.36067C1.12169 7.43039 1.26361 10.1618 1.44217 13.4345C1.68024 17.9458 1.77639 19.4304 1.82675 19.5863C1.98699 20.0579 2.41735 20.5337 2.90265 20.7674C3.38795 21.0053 3.18651 21.0012 9.5 21.0012C15.8272 21.0012 15.6075 21.0094 16.1111 20.7633C16.5918 20.5296 17.0634 19.9882 17.1916 19.5248C17.2282 19.3812 17.8737 7.98405 17.8783 7.38118V7.22943L18.2171 7.21303C18.5834 7.19662 18.7207 7.13921 18.9039 6.91774C18.9954 6.80701 19 6.7537 19 5.33879V3.87467L18.8306 3.56298C18.6246 3.18977 18.359 2.96011 17.9333 2.77966L17.6265 2.64842L15.3969 2.63611L13.1627 2.62381V2.18499C13.1627 1.47548 12.9887 1.04076 12.5354 0.614235C12.2561 0.351759 11.8899 0.159004 11.4916 0.0646763C11.107 -0.0214481 7.86096 -0.0214481 7.49012 0.0687771ZM11.3588 1.42217C11.6335 1.60262 11.6747 1.69695 11.6884 2.18088L11.7067 2.62791H9.5H7.29325L7.31157 2.18499C7.3253 1.77487 7.33446 1.72565 7.44892 1.59442C7.68699 1.31554 7.68241 1.31554 9.55494 1.32784C11.1711 1.33604 11.2398 1.34014 11.3588 1.42217ZM17.4434 4.04282C17.5578 4.14125 17.5578 4.14125 17.5578 5.0271V5.90885H9.5H1.44217V5.0271C1.44217 4.14125 1.44217 4.14125 1.55663 4.04282L1.66651 3.94029H9.5H17.3335L17.4434 4.04282ZM16.4133 7.29095C16.4178 7.63135 15.8089 18.8686 15.7769 19.0613C15.7265 19.3607 15.6304 19.4961 15.3786 19.6068C15.1954 19.6888 15.1176 19.6888 9.5 19.6888C3.88241 19.6888 3.80458 19.6888 3.62145 19.6068C3.36964 19.4961 3.27349 19.3607 3.22313 19.0613C3.19108 18.8686 2.58217 7.63135 2.58675 7.29095C2.58675 7.22533 2.94843 7.22123 9.5 7.22123C16.0516 7.22123 16.4133 7.22533 16.4133 7.29095Z"
                          fill="black"
                          fill-opacity="0.7"
                        />
                        <path
                          d="M5.5398 8.59105C5.35209 8.66488 5.1598 8.87403 5.12776 9.03808C5.11402 9.1119 5.10944 11.1461 5.11402 13.5658C5.12776 17.9294 5.12776 17.9622 5.2239 18.073C5.40246 18.2903 5.54896 18.356 5.8374 18.356C6.12583 18.356 6.27233 18.2903 6.45089 18.073C6.54703 17.9622 6.54703 17.9417 6.54703 13.4551C6.54703 8.96836 6.54703 8.94786 6.45089 8.83712C6.40053 8.77561 6.30438 8.68538 6.24029 8.64437C6.0892 8.54184 5.72294 8.51313 5.5398 8.59105Z"
                          fill="black"
                          fill-opacity="0.7"
                        />
                        <path
                          d="M9.2024 8.59105C9.01469 8.66488 8.8224 8.87403 8.79035 9.03808C8.77662 9.1119 8.77204 11.1461 8.77662 13.5658C8.79035 17.9294 8.79035 17.9622 8.8865 18.073C9.06505 18.2903 9.21156 18.356 9.49999 18.356C9.78843 18.356 9.93493 18.2903 10.1135 18.073C10.2096 17.9622 10.2096 17.9417 10.2096 13.4551C10.2096 8.96836 10.2096 8.94786 10.1135 8.83712C10.0631 8.77561 9.96698 8.68538 9.90288 8.64437C9.7518 8.54184 9.38553 8.51313 9.2024 8.59105Z"
                          fill="black"
                          fill-opacity="0.7"
                        />
                        <path
                          d="M12.865 8.59105C12.6773 8.66488 12.485 8.87404 12.453 9.03808C12.4392 9.1119 12.4346 11.1461 12.4392 13.5658C12.453 17.9294 12.453 17.9622 12.5491 18.073C12.7277 18.2903 12.8742 18.356 13.1626 18.356C13.451 18.356 13.5975 18.2903 13.7761 18.073C13.8722 17.9622 13.8722 17.9417 13.8722 13.4551C13.8722 8.96836 13.8722 8.94786 13.7761 8.83712C13.7257 8.77561 13.6296 8.68538 13.5655 8.64437C13.4144 8.54184 13.0481 8.51313 12.865 8.59105Z"
                          fill="black"
                          fill-opacity="0.7"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_765_1111">
                          <rect width="19" height="21" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
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
          <div style={{ display: "flex", paddingRight: 16 }}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                background: "none",
                padding: 0,
              }}
              onClick={handlePreviousPage}
              disabled={pagination.currentPage === 1}
            >
              <img src={arrowheadLeft} style={{ width: 16, height: 16 }} alt="Previous" />
            </button>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                background: "none",
                padding: 0,
              }}
              onClick={handleNextPage}
              disabled={pagination.currentPage === pagination.totalPages}
            >
              <img src={arrowheadRight} style={{ width: 16, height: 16 }} alt="Previous" />
            </button>
          </div>
          <span>
            {pagination.currentPage} of {pagination.totalPages}
          </span>
        </div>
      </div>
    </div>
  );
};
