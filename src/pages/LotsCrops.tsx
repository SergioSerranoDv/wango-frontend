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
import { Table, TableRow, TableCell, TableRow2 } from "../styles/TableStyles";
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

export const LotsCrops: React.FC = () => {
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
  // const [Crop, setCrop] = useState<{
  //   id: string | undefined;
  //   area: number;
  //   lot_id: string;
  //   name: string;
  //   latitude: string | undefined;
  //   longitude: string | undefined;
  // }>({
  //   id: "",
  //   area: 0,
  //   lot_id: "",
  //   name: "",
  //   latitude: "",
  //   longitude: "",
  // });
  //  UseEffect to load the lot data
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
    window.open(`/edit-crop/${crop._id}`, "_self");
  };
  const handleDelete = async (cropId: string) => {
    const response = await backendApiCall({
      method: "DELETE",
      endpoint: `v1/crop/delete/${cropId}`,
      body: {
        lot_id: lotId,
      },
    });
    if (response.status === "success") {
      setShowNotification(true);
      setRefetch((prev) => prev + 1);
      setRefetchLotDetails((prev) => prev + 1);
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
            <br />
            {""}
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
              evencolor="#FFFFFF"
              oddcolor="rgb(255, 103, 15, 0.2)"
              columns={["ID", "Cultivos", "Área", "Acciones"]}
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
          {/* <Container>
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
                    <a href="#">Edi </a>
                    <a href="#"> Eli </a>
                  </TableCell>
                </TableRow2>
                <TableRow2 index={2}>
                  <TableCell $custom1>2</TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <a href="#">Edi </a>
                    <a href="#"> Eli </a>
                  </TableCell>
                </TableRow2>
                <TableRow2 index={3}>
                  <TableCell $custom1>3</TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <a href="#">Edi </a>
                    <a href="#"> Eli </a>
                  </TableCell>
                </TableRow2>
              </tbody>
            </Table>
          </Container> */}
          {/*Mostrar modal de notificación si showNotification es true*/}
          {showNotification && (
            <NotificationModal
              title="Cultivo eliminado exitosamente"
              description="El cultivo ha sido eliminado con éxito."
              status="success" // Asegúrate de tener esta variable definida
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
};
