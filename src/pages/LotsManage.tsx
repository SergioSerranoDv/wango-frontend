import React, { useState, useContext } from "react";
import { TableV1 } from "../components/TableV1";
import { MainLayout } from "../layouts/MainLayout";
import { UseGet } from "../hooks/UseGet";
import { ApiContext } from "../context/ApiContext";
import { AppContext } from "../context/AppContext";
import { LotI } from "../interfaces/Lot";
import { SignBoard, Link } from "../styles/FormStyles";
import { Text } from "../styles/MainMenuStyles";
import { Container } from "../styles/GlobalStyles";
import { NotificationModal } from "../components/modals/NotificationModal";

export const LotsManage: React.FC = () => {
  const { userData } = useContext(AppContext);
  const { backendApiCall } = useContext(ApiContext);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showNotification, setShowNotification] = useState(false);
  const { data, loading, setRefetch } = UseGet({
    endpoint: `v1/lot/paginated?page=${currentPage}&limit=${rowsPerPage}`,
  });

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
    setShowNotification(false);
  };

  //  useEffect(() => {
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
        <br />{" "}
        {!loading && data.lots.length > 0 && (
          <TableV1
            data={data.lots}
            pagination={{
              rowsPerPage,
              setRowsPerPage,
              currentPage,
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
            status="success" // Asegúrate de tener esta variable definida
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
