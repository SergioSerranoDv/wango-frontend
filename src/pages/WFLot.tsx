import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LotDataInit } from "../interfaces/Lot";
import { NotificationModal } from "../components/modals/NotificationModal";
import { MainLayout } from "../layouts/MainLayout";
import { TableV1 } from "../components/TableV1";
import { UseGet } from "../hooks/UseGet";
import { ApiContext } from "../context/ApiContext";
import { fetchLotDetails } from "../services/lot_s";
import { Crop } from "../interfaces/crop";
import { Container } from "../styles/GlobalStyles";
import { Text } from "../styles/MainMenuStyles";
import {
  Button,
  DetailsItem,
  DetailsSign,
  InfoContainer,
  Link,
  RegisterFormContainer,
  SignBoard,
} from "../styles/lotscropsStyles";

export const WFLot: React.FC = () => {
  const { id } = useParams();
  const lotId = id || "";
  const { backendApiCall, serviceIsReady } = useContext(ApiContext);
  const [refetchLotDetails, setRefetchLotDetails] = useState<number>(0);
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
  }, [lotId, serviceIsReady, refetchLotDetails]);

  const handleEdit = (crop: Crop) => {
    window.open(`/lot-menu/water-footprint/crops/${crop._id}`, "_self");
  };
  const handleDelete = async (cropId: string) => {
    
  };
  const handleNotificationClose = () => {
    setShowNotification(false);
  };
  return (
    <div>
      <MainLayout>
        <Container>
          <Text>Registros para la huella hídrica en el lote '{Lot.name}'</Text>
          <RegisterFormContainer>
            <br />
            <br />{" "}
            <InfoContainer>
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
          </RegisterFormContainer>
          {!loading && data && data.crops.length > 0 && (
            <TableV1
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
              options={{ edit: handleEdit , delete: handleEdit}}
            />
          )}
          <RegisterFormContainer>
            <InfoContainer>
              <DetailsSign $custom3>
                Nota: Para ver los registros y el valor del componente de un cultivo, debes
                finalizar el proceso de recolección de registros dando click en el ícono de la mano.
              </DetailsSign>
            </InfoContainer>
          </RegisterFormContainer>
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
        </Container>
      </MainLayout>
    </div>
  );
};
