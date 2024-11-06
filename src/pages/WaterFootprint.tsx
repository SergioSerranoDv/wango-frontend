import React, { useState } from "react";
import { WForm } from "../components/forms/WForm";
import { Modal } from "../components/modals/Modal";
import { TableV1 } from "../components/tables/TableV1";
import { MainLayout } from "../layouts/MainLayout";
import { UseGet } from "../hooks/UseGet";
import { ButtonSecondary } from "../styles/AddLoteStyles";
import { Text } from "../styles/LoteMenuStyles";

export const WaterFootPrint = () => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, loading, setRefetch } = UseGet({
    endpoint: `water-footprint/records?page=${currentPage}&limit=${rowsPerPage}`,
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
            columns={columns(data)}
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
