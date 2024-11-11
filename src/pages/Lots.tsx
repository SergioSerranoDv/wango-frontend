import React, { useContext, useCallback, useState } from "react";
import { Header } from "../components/Header";
import { LoadingAnimation } from "../components/Loading";
import { LotActions } from "../components/actions/LotActions";
import { LotForm } from "../components/forms/LotForm";
import { Modal } from "../components/modals/Modal";
import { TableV1 } from "../components/tables/TableV1";
import { AppContext } from "../context/AppContext";
import { useLotsData } from "../hooks/UseLotsData";
import { UsePagination } from "../hooks/UsePagination";
import { LotI } from "../interfaces/Lot";
import { MainLayout } from "../layouts/MainLayout";
import { formatDate } from "../services/Date";
import { Button } from "../styles/FormStyles";

export const Lots: React.FC = () => {
  const { userData } = useContext(AppContext);
  const { currentPage, setCurrentPage, rowsPerPage, setRowsPerPage } = UsePagination();
  const { data, loading, setRefetch } = useLotsData(currentPage, rowsPerPage);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Memoized columns definition
  const columns = useCallback(
    () => [
      {
        title: "Fecha de creación",
        dataIndex: "createdAt",
        render: (lot: LotI) => formatDate(lot.createdAt),
      },
      {
        title: "Nombre",
        dataIndex: "name",
        render: (lot: LotI) => lot.name,
      },
      {
        title: "Capacidad (Ha)",
        dataIndex: "capacity",
        render: (lot: LotI) => lot.capacity,
      },
      {
        title: "Capacidad disponible (Ha)",
        dataIndex: "available_capacity",
        render: (lot: LotI) => lot.available_capacity,
      },
      {
        title: "Acciones",
        dataIndex: "_id",
        render: (lot: LotI) => (
          <LotActions lotDetails={lot} refetchLotDetails={() => setRefetch((prev) => prev + 1)} />
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
        <>
          <Header
            description={`Estos son tus lotes ${userData.name}, aquí puedes ver y administrar tus lotes.`}
            title="Crear Lote"
            openModal={() => setIsModalOpen(true)}
          />
          <TableV1
            evencolor="#FFFFFF"
            oddcolor="rgb(255, 103, 15, 0.2)"
            data={data.lots}
            pagination={{
              rowsPerPage,
              setRowsPerPage,
              currentPage,
              setCurrentPage,
              setRefetch,
              totalPages: data.meta.total_pages,
            }}
            title="Lotes"
            columns={columns()}
          />
        </>
      )}
      {isModalOpen && (
        <Modal
          footer={
            <Button form="lot-form" type="submit">
              Crear
            </Button>
          }
          title="Nuevo Lote"
          closeModal={() => setIsModalOpen(false)}
        >
          <LotForm />
        </Modal>
      )}
    </MainLayout>
  );
};
