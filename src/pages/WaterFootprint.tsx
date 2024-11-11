import React, { useState } from "react";
import { LoadingAnimation } from "../components/Loading";
import { WFActions } from "../components/actions/WFActions";
import { WForm } from "../components/forms/WForm";
import { Modal } from "../components/modals/Modal";
import { TableV1 } from "../components/tables/TableV1";
import { UseGet } from "../hooks/UseGet";
import { UsePagination } from "../hooks/UsePagination";
import { WaterFootprintI } from "../interfaces/WaterFootprint";
import { MainLayout } from "../layouts/MainLayout";
import { ButtonSecondary } from "../styles/AddLoteStyles";
import { Text } from "../styles/LoteMenuStyles";

export const WaterFootPrint = () => {
  const { currentPage, setCurrentPage, rowsPerPage, setRowsPerPage } = UsePagination();
  const { data, loading, setRefetch } = UseGet({
    endpoint: `water-footprint/records?page=${currentPage}&limit=${rowsPerPage}`,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = () => {
    return [
      {
        title: "Lote",
        dataIndex: "name",
        render: (data: WaterFootprintI) => <span>{data.lotData?.name}</span>,
      },
      {
        title: "Cultivo",
        dataIndex: "capacity",
        render: (data: WaterFootprintI) => <span>{data.cropData?.name}</span>,
      },
      {
        title: "Recolección",
        dataIndex: "capacity",
        render: (data: WaterFootprintI) => <span>{data.collectionData?.name}</span>,
      },
      {
        title: "Total (m³)",
        dataIndex: "capacity",
        render: (data: WaterFootprintI) => <span>{data.total}</span>,
      },
      {
        title: "Acciones",
        dataIndex: "_id",
        render: (data: WaterFootprintI) => <WFActions WFDetails={data} />,
      },
    ];
  };

  return (
    <MainLayout>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <>
          <Header openModal={() => setIsModalOpen(true)} />
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
            columns={columns()}
          />
        </>
      )}
      {isModalOpen && (
        <Modal title="Calcular huella" closeModal={() => setIsModalOpen(false)}>
          <WForm />
        </Modal>
      )}
    </MainLayout>
  );
};

const Header: React.FC<{ openModal: () => void }> = ({ openModal }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "32px",
      alignItems: "center",
    }}
  >
    <Text>
      Para calcular la huella hídrica de un cultivo, primero selecciona un cultivo y luego la
      recolección asociada.
    </Text>
    <ButtonSecondary onClick={openModal}>
      <span>
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginRight: "6px" }}
        >
          <path d="M11 13v6h2v-6h6v-2h-6V5h-2v6H5v2h6z" fill="currentColor"></path>
        </svg>
      </span>
      Calcular
    </ButtonSecondary>
  </div>
);
