import Navbar from "../components/Navbar";
import React, { useState, useContext } from "react";
import { TableV1 } from "../components/TableV1";
import { UseGet } from "../hooks/UseGet";
import { Container } from "../styles/LotsTableStyles";
import { fetchPaginatedLotsPerUser, deleteLot } from "../services/lot_s";
import { ApiContext } from "../context/ApiContext";
import { AppContext } from "../context/AppContext";
import { Lot } from "../interfaces/Lot";
import { SignBoard, Link } from "../styles/FormStyles";
import { Text } from "../styles/MainMenuStyles";
import checkLogo from "../assets/icons/checkLogo.svg";
import NotificationModal from "../components/modals/NotificationModal";

function LotsManage() {
  const { userData } = useContext(AppContext);
  const { backendApiCall } = useContext(ApiContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showNotification, setShowNotification] = useState(false);
  const { data, loading, setRefetch } = UseGet(
    fetchPaginatedLotsPerUser(backendApiCall, { page: currentPage, limit: 5 })
  );

  const handleEdit = (lot: Lot) => {
    window.open(`/lot-menu/${lot._id}`, "_self");
  };

  const handleDelete = async (lotId: string) => {
    const success = await deleteLot(backendApiCall, lotId);
    if (success) {
      setShowNotification(true); // Mostrar notificación cuando se elimine con éxito
      // No es recomendable recargar la página después de eliminar un elemento; preferiblemente, actualiza el estado para reflejar los cambios
      // window.location.reload();
    }
  };
  const handleNotificationClose = () => {
    setShowNotification(false); // Cierra la notificación cuando el usuario hace clic en el botón Aceptar
  };
  return (
    <div>
      <Navbar />
      <Container>
        <Text>Estos son tus lotes, {userData.name}!</Text>
        <br />
        <br />{" "}
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
            options={{ edit: handleEdit, delete: handleDelete }}
          />
        )}
        <SignBoard>
          ¿Quieres añadir un lote?
          <Link $primary href="/add-lote">
            Agregar lote
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
    </div>
  );
}

export default LotsManage;
