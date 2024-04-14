import React, { useState, useContext, useEffect } from "react";
import { NotificationModal } from "../components/modals/NotificationModal";
import { TableV1 } from "../components/TableV1";
import { MainLayout } from "../layouts/MainLayout";
import { useGetById } from "../hooks/useGetById";
import { ApiContext } from "../context/ApiContext";
import { AppContext } from "../context/AppContext";
import { LotI } from "../interfaces/Lot";
import { SignBoard, Link } from "../styles/FormStyles";
import { Text } from "../styles/MainMenuStyles";
import { Container } from "../styles/GlobalStyles";

export const LotsManage = () => {
  const { userData } = useContext(AppContext);
  const { backendApiCall } = useContext(ApiContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [showNotification, setShowNotification] = useState(false);
  const { data, loading, setRefetch } = useGetById({
    endpoint: `v1/lot/paginated?page=${currentPage}&limit=${rowsPerPage}`,
  });
  console.log(data);
  const handleEdit = (lot: LotI) => {
    window.open(`/lot-menu/${lot._id}`, "_self");
  };

  const handleDelete = async (lotId: string) => {
    const response = await backendApiCall({ method: "DELETE", endpoint: `v1/lot/delete/${lotId}` });
    if (response.status === "success") {
      setShowNotification(true);
      setRefetch((prev) => prev + 1);
    }
  };

  const handleNotificationClose = () => {
    setShowNotification(false); // Cierra la notificación cuando el usuario hace clic en el botón Aceptar
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowLoading(false);
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <MainLayout>
      <Container>
        <Text>Estos son tus lotes, {userData.name}!</Text>
        <br />
        {!loading && data && (
          <TableV1
            data={data.lots}
            pagination={{
              currentPage,
              rowsPerPage,
              setRowsPerPage,
              setCurrentPage,
              setRefetch,
              totalPages: data.meta.total_pages,
            }}
            columns={["ID", "Lote", "Capacidad", "Acciones"]}
            columnMapping={{
              Lote: "name",
              Capacidad: "capacity",
            }}
            options={{ edit: handleEdit, delete: handleDelete }}
          />
        )}
        <SignBoard>
          ¿Quieres añadir un lote?
          <Link $primary href="/add-lote">
            ¡Hazlo aquí!
          </Link>
        </SignBoard>
        {/* Mostrar modal de notificación si showNotification es true */}
        {showNotification && (
          <NotificationModal
            title="Lote eliminado exitosamente"
            description="El lote ha sido eliminado con éxito."
            status="success"
            buttonText="Aceptar"
            onClose={handleNotificationClose}
            // No estoy seguro de qué debería ir en redirectUrl, así que dejé este campo vacío
            redirectUrl=""
          />
        )}
      </Container>
    </MainLayout>
  );
};
