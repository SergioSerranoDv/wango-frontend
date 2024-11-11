import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { LoadingAnimation } from "../components/Loading";
import { CropActions } from "../components/actions/CropActions";
import { TableV1 } from "../components/tables/TableV1";
import { UseCropsData } from "../hooks/UseCropsData";
import { UsePagination } from "../hooks/UsePagination";
import { Crop } from "../interfaces/crop";
import { MainLayout } from "../layouts/MainLayout";
import { formatDate } from "../services/Date";
import { Text } from "../styles/MainMenuStyles";

export const Crops: React.FC = () => {
  const { id } = useParams();
  const lotId = id || "";
  const { currentPage, setCurrentPage, rowsPerPage, setRowsPerPage } = UsePagination();
  const { data, loading, setRefetch } = UseCropsData(currentPage, rowsPerPage, lotId);

  const columns = useCallback(
    () => [
      {
        title: "Fecha de creación",
        dataIndex: "createdAt",
        render: (data: Crop) => (data.createdAt ? formatDate(data.createdAt) : "N/A"),
      },
      {
        title: "Nombre",
        dataIndex: "name",
        render: (data: Crop) => data.name,
      },
      {
        title: "Area (Ha)",
        dataIndex: "area",
        render: (data: Crop) => data.area,
      },
      {
        title: "Latitud (°)",
        dataIndex: "latitude",
        render: (data: Crop) => data.latitude,
      },
      {
        title: "Longitud (°)",
        dataIndex: "longitude",
        render: (data: Crop) => data.longitude,
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
      <Header />
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

const Header = () => (
  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "32px" }}>
    <Text>
      Estos son tus cultivos, recuerda que solo puedes tener una recolección activa por cultivo
    </Text>
  </div>
);
