import React, { useState, useContext, useEffect } from "react";
import { TableV1 } from "../components/TableV1";
import { MainLayout } from "../layouts/MainLayout";
import { UseGet } from "../hooks/UseGet";
import { fetchPaginatedLotsPerUser, deleteLot } from "../services/lot_s";
import { ApiContext } from "../context/ApiContext";
import { AppContext } from "../context/AppContext";
import { Lot } from "../interfaces/Lot";
import { SignBoard, Link } from "../styles/FormStyles";
import { Text } from "../styles/MainMenuStyles";
import checkLogo from "../assets/icons/checkLogo.svg";
import { Container } from "../styles/GlobalStyles";
import NotificationModal from "../components/modals/NotificationModal";
import Loading from "../components/Loading";

function LotsManage() {
  const { userData } = useContext(AppContext);
  const { backendApiCall } = useContext(ApiContext);
  const [showLoading, setShowLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [showNotification, setShowNotification] = useState(false);
  const { data, loading, setRefetch } = UseGet(
    fetchPaginatedLotsPerUser(backendApiCall, { page: currentPage, limit: rowsPerPage })
  );

  const handleEdit = (lot: Lot) => {
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <MainLayout>
      <Container>
        <Text>Estos son tus lotes, {userData.name}!</Text>
        <br />
        {!loading && data.lots.length > 0 && (
          <TableV1
            data={data.lots}
            pagination={{
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
            imageUrl={checkLogo} // Asegúrate de tener esta variable definida
            buttonText="Aceptar"
            onClose={handleNotificationClose}
            // No estoy seguro de qué debería ir en redirectUrl, así que dejé este campo vacío
            redirectUrl=""
          />
        )}
      </Container>
    </MainLayout>
  );
}

export default LotsManage;
