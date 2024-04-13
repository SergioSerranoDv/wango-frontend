import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ApiContext } from "../context/ApiContext";
import { Container } from "../styles/GlobalStyles";
import { fetchLotDetails } from "../services/lot_s";
import { fetchPaginatedCropsByLotId } from "../services/crop_s";
import { TableV1 } from "../components/TableV1";
import { UseGet } from "../hooks/UseGet";
import { Table, TableRow, TableCell, TableRow2 } from "../styles/LotsTableStyles";
import { Text } from "../styles/MainMenuStyles";
import NotificationModal from "../components/modals/NotificationModal";
import checkLogo from "../assets/icons/checkLogo.svg";
import { Crop } from "../interfaces/crop";
import {
  Button,
  DetailsItem,
  DetailsSign,
  InfoContainer,
  Link,
  RegisterFormContainer,
  SignBoard,
} from "../styles/lotscropsStyles";
import { MainLayout } from "../layouts/MainLayout";

export default function LotsCrops() {
  const { id } = useParams();
  //const { userData } = useContext(AppContext);
  const lotId = id || "";
  const { backendApiCall } = useContext(ApiContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showNotification, setShowNotification] = useState(false);

  const { data, loading, setRefetch } = UseGet(
    fetchPaginatedCropsByLotId(backendApiCall, {
      page: currentPage,
      limit: 5,
      lotId: lotId,
    })
  );

  const [Lot, setLot] = useState<{
    id: string | undefined;
    name: string;
    available_capacity: number;
    capacity_in_use: number | undefined;
  }>({
    id: "",
    name: "",
    available_capacity: 0,
    capacity_in_use: 0,
  });

  const [Crop, setCrop] = useState<{
    id: string | undefined;
    area: number;
    lot_id: string;
    name: string;
    latitude: string | undefined;
    longitude: string | undefined;
  }>({
    id: "",
    area: 0,
    lot_id: "",
    name: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchLotDetails(backendApiCall, lotId);
      console.log("Response: ", response);
      if (response) {
        setLot({
          id: response._id,
          name: response.name,
          available_capacity: response.available_capacity,
          capacity_in_use: response.capacity_in_use,
        });
      }
    };
    fetchData();
  }, [lotId]);
  const handleEdit = (crop: Crop) => {
    window.open(`/edit-crop/${crop._id}`, "_self");
  };
  const handleDelete = async (cropId: string) => {
    const response = await backendApiCall({
      method: "DELETE",
      endpoint: `v1/crop/delete/${cropId}`,
    });
    if (response.status === "success") {
      setShowNotification(true);
      setRefetch((prev) => prev + 1);
    }
  };
  const handleNotificationClose = () => {
    setShowNotification(false);
  };
  return (
    <div>
      <MainLayout>
        <Container>
          <Text>Cultivos del lote '{Lot.name}'</Text>
          <RegisterFormContainer>
            <br />
            <br />{" "}
            <InfoContainer>
              <DetailsSign $custom3>
                ID lote: <DetailsItem>{id?.slice(0, 4)}...</DetailsItem>
              </DetailsSign>
              <DetailsSign $custom3>
                Área disponible: <DetailsItem>{Lot.available_capacity} Ha</DetailsItem>
              </DetailsSign>
              <DetailsSign $custom3>
                Área en ocupación: <DetailsItem>{Lot.capacity_in_use} Ha</DetailsItem>
              </DetailsSign>
              <DetailsSign $custom3>Cultivos:</DetailsSign>
            </InfoContainer>
          </RegisterFormContainer>
          {!loading && data.crops.length > 0 && (
            <TableV1
              columns={["ID", "Cultivos", "Área", "Acciones"]}
              columnMapping={{
                Cultivos: "name",
                Área: "area",
              }}
              data={data.crops}
              pagination={{
                currentPage,
                setCurrentPage,
                setRefetch,
                totalPages: data.meta.total_pages,
              }}
              columns={["ID", "Cultivo", "Área", "Acciones"]}
              options={{ edit: handleEdit, delete: handleDelete }}
            />
          )}
          <SignBoard $custom3>
            ¿Quieres añadir un cultivo?{" "}
            <Link href={`/lot-menu/new-crop/${lotId}`} $custom3>
              ¡Hazlo aquí!
            </Link>
          </SignBoard>
          <Button type="submit" $custom1>
            Crear nuevo encargado
          </Button>
          <InfoContainer>
            <DetailsSign $custom3>Usuarios encargados:</DetailsSign>
          </InfoContainer>
          <Container>
            <Table $custom>
              <thead>
                <TableRow index={-1}>
                  <TableCell $custom>ID</TableCell>
                  <TableCell $custom>Nombres</TableCell>
                  <TableCell $custom>Acciones</TableCell>
                </TableRow>
              </thead>
              <tbody>
                <TableRow2 index={1}>
                  <TableCell $custom1>1</TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <a>Edi </a>
                    <a> Eli </a>
                  </TableCell>
                </TableRow2>
                <TableRow2 index={2}>
                  <TableCell $custom1>2</TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <a>Edi </a>
                    <a> Eli </a>
                  </TableCell>
                </TableRow2>
                <TableRow2 index={3}>
                  <TableCell $custom1>3</TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <a>Edi </a>
                    <a> Eli </a>
                  </TableCell>
                </TableRow2>
              </tbody>
            </Table>
          </Container>
          {/*Mostrar modal de notificación si showNotification es true*/}
          {showNotification && (
            <NotificationModal
              title="Cultivo eliminado exitosamente"
              description="El cultivo ha sido eliminado con éxito."
              imageUrl={checkLogo} // Asegúrate de tener esta variable definida
              buttonText="Aceptar"
              onClose={handleNotificationClose}
              // No estoy seguro de qué debería ir en redirectUrl, así que dejé este campo vacío
              redirectUrl=""
            />
          )}
        </Container>
      </MainLayout>
    </div>
  );
}
