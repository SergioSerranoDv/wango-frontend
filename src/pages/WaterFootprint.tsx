import React, { useState } from "react";
import { TableV1 } from "../components/tables/TableV1";
import { MainLayout } from "../layouts/MainLayout";
import { UseGet } from "../hooks/UseGet";

export const WaterFootPrint = () => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, loading, setRefetch } = UseGet({
    endpoint: `v1/water-footprint/records?page=${currentPage}&limit=${rowsPerPage}`,
  });

  const columns = (data: any) => {
    return [
      {
        title: "Componente azul",
        dataIndex: "name",
        render: (data: any) => <span>{data.blue_component}</span>,
      },
      {
        title: "Componente verde",
        dataIndex: "capacity",
        render: (data: any) => <span>{data.green_component}</span>,
      },
      {
        title: "Componente gris",
        dataIndex: "capacity",
        render: (data: any) => <span>{data.grey_component}</span>,
      },
      {
        title: "Total",
        dataIndex: "capacity",
        render: (data: any) => <span>{data.total}</span>,
      },
    ];
  };

  return (
    <MainLayout>
      {!loading && data.records.length > 0 && (
        <TableV1
          evencolor="#FFFFFF"
          oddcolor="rgb(255, 103, 15, 0.2)"
          data={data.records}
          pagination={{
            rowsPerPage,
            setRowsPerPage,
            currentPage,
            setCurrentPage,
            setRefetch,
            totalPages: data.meta.total_pages,
          }}
          title="Huellas hidricas"
          columns={columns(data)}
        />
      )}
    </MainLayout>
  );
};
