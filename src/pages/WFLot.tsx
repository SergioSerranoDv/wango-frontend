import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LotDataInit } from "../interfaces/Lot";
import { NotificationModal } from "../components/modals/NotificationModal";
import { MainLayout } from "../layouts/MainLayout";
import { TableV1 } from "../components/tables/TableV1";
import { UseGet } from "../hooks/UseGet";
import { ApiContext } from "../context/ApiContext";
import { fetchLotDetails } from "../services/lot_s";
import { Crop } from "../interfaces/crop";
import { Text } from "../styles/MainMenuStyles";
import { DetailsItem, DetailsSign, InfoContainer } from "../styles/lotscropsStyles";
import { SubContainer } from "../styles/GlobalStyles";

export const WFLot: React.FC = () => {
  const { id } = useParams();
  const lotId = id || "";
  const { backendApiCall, serviceIsReady } = useContext(ApiContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showNotification, setShowNotification] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const { data, loading, setRefetch } = UseGet({
    endpoint: `v1/crop/paginated?page=${currentPage}&limit=${rowsPerPage}&lot_id=${lotId}`,
  });
  const [Lot, setLot] = useState(LotDataInit);
  useEffect(() => {
    const fetchLotData = async () => {
      const response = await fetchLotDetails(backendApiCall, lotId);
      if (response.status === "success" && response.data !== undefined) {
        setLot({
          _id: response.data._id,
          capacity: response.data.capacity,
          name: response.data.name,
          available_capacity: response.data.available_capacity,
          capacity_in_use: response.data.capacity_in_use,
        });
      }
    };
    serviceIsReady && fetchLotData();
  }, [lotId, serviceIsReady]);

  const handleEdit = (crop: Crop) => {
    window.open(`/lot-menu/water-footprint/crops/${crop._id}`, "_self");
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  return (
    <MainLayout>
      <SubContainer>
        <Text style={{ marginBottom: "1rem" }}>
          Registros para la huella hídrica en el lote '{Lot.name}'
        </Text>
        <InfoContainer style={{ margin: "1rem 0" }}>
          <DetailsSign $custom3>
            ID: <DetailsItem>{Lot._id !== undefined && `${Lot._id}`}</DetailsItem>
          </DetailsSign>
          <DetailsSign $custom3>
            Área disponible:{" "}
            <DetailsItem>
              {" "}
              {Lot.capacity_in_use !== undefined ? `${Lot.available_capacity} Ha` : ``}
            </DetailsItem>
          </DetailsSign>
          <DetailsSign $custom3>
            Área en ocupación:{" "}
            <DetailsItem>
              {Lot.capacity_in_use !== undefined ? `${Lot.capacity_in_use} Ha` : ``}
            </DetailsItem>
          </DetailsSign>
          <DetailsSign $custom3>Cultivos:</DetailsSign>
        </InfoContainer>
        {!loading && data && data.crops.length > 0 && (
          <TableV1
            title="Lotes"
            evencolor="#FFFFFF"
            oddcolor="rgb(255, 103, 15, 0.2)"
            columns={["ID", "Cultivos", "Área", "Opciones"]}
            columnMapping={{
              Cultivos: "name",
              Área: "area",
            }}
            data={data.crops}
            pagination={{
              currentPage,
              setCurrentPage,
              rowsPerPage,
              setRowsPerPage,
              setRefetch,
              totalPages: data.meta.total_pages,
            }}
            options={{ edit: handleEdit, delete: handleEdit }}
          />
        )}
        <InfoContainer>
          <DetailsSign $custom3 style={{ textAlign: "center", marginTop: "1rem" }}>
            Nota: Para ver los registros y el valor del componente de un cultivo, debes finalizar el
            proceso de recolección de registros dando click en el ícono de la mano.
          </DetailsSign>
        </InfoContainer>
        {showNotification && (
          <NotificationModal
            title="Cultivo eliminado exitosamente"
            description="El cultivo ha sido eliminado con éxito."
            status="success"
            buttonText="Aceptar"
            onClose={handleNotificationClose}
            redirectUrl=""
          />
        )}
      </SubContainer>
    </MainLayout>
  );
};
