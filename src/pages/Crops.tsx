import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { CropActions } from "../components/actions/CropActions";
import { LoadingAnimation } from "../components/Loading";
import { TableV1 } from "../components/tables/TableV1";
import { MainLayout } from "../layouts/MainLayout";
import { UseGet } from "../hooks/UseGet";
import { Crop } from "../interfaces/crop";
import { UsePagination } from "../hooks/UsePagination";

export const Crops: React.FC = () => {
  const { id } = useParams();
  const lotId = id || "";
  const { currentPage, setCurrentPage, rowsPerPage, setRowsPerPage } = UsePagination();
  const { data, loading, setRefetch } = UseGet({
    endpoint: `v1/crop/paginated?page=${currentPage}&limit=${rowsPerPage}&lot_id=${lotId}`,
  });

  const columns = useCallback(
    () => [
      {
        title: "Nombre",
        dataIndex: "name",
        render: (data: Crop) => <span>{data.name}</span>,
      },
      {
        title: "Area",
        dataIndex: "area",
        render: (data: Crop) => <span>{data.area}</span>,
      },
      {
        title: "Estado de recolección",
        dataIndex: "status_data_collection",
        render: (data: Crop) => <span>{data.status_data_collection}</span>,
      },
      {
        title: "Acciones",
        dataIndex: "_id",
        render: (data: Crop) => (
          <CropActions
            cropDetails={data}
            refetchLotDetails={() => setRefetch((prev) => prev + 1)}
          />
        ),
      },
    ],
    [setRefetch]
  );

  return (
    <MainLayout>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <TableV1
          columns={columns()}
          title="Cultivos"
          evencolor="#FFFFFF"
          oddcolor="rgb(255, 103, 15, 0.2)"
          data={data.crops}
          pagination={{
            currentPage,
            setCurrentPage,
            rowsPerPage,
            setRowsPerPage,
            setRefetch,
            totalPages: data.meta.total_pages,
          }}
        />
      )}
    </MainLayout>
  );
};
