import React, { useState, useContext, useEffect } from "react";
import { Lot } from "../interfaces/Lot";
import { redirect, useParams } from "react-router-dom";
import { fetchLotDetails } from "../services/lot_s";
import { ApiContext } from "../context/ApiContext";
import NotificationModal from "../components/modals/NotificationModal";
import checkLogo from "../assets/icons/checkLogo.svg";
import Navbar from "../components/Navbar";
import {
  Button,
  ButtonSubmit,
  Description,
  DetailsItem,
  DetailsSign,
  Form,
  InfoContainer,
  Input,
  Label,
  FormContainer,
  SignBoard,
} from "../styles/FormStyles";
import { Container, Table, TableRow, TableCell, TableRow2 } from "../styles/LotsTableStyles";

import { createNewCrop } from "../services/crop_s";

export default function RegisterView() {
  const { id } = useParams();
  const lotId = id;
  const { backendApiCall } = useContext(ApiContext);
  const [refetch, setRefetch] = useState<number>(0);
  const [lotData, setLotData] = useState({} as Lot);
  const [formData, setFormData] = useState({
    cropName: "",
    area: "",
    latitude: "",
    longitude: "",
  });
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationDetails, setNotificationDetails] = useState({
    title: "",
    description: "",
    redirectUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotification = (title: string, description: string, redirectUrl: string) => {
    setNotificationDetails({ title, description, redirectUrl });
    setShowNotification(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!lotId) {
        handleNotification("Error", "No se ha encontrado el ID del lote", "");
        return;
      }
      if (lotData.available_capacity === 0) {
        handleNotification("Error", "El lote no tiene capacidad disponible", "");
        return;
      }
      if (parseInt(formData.area) > lotData.available_capacity) {
        handleNotification("Error", "El área debe ser menor o igual a la capacidad disponible", "");
        return;
      }
      if (parseInt(formData.area) <= 0) {
        handleNotification("Error", "El área debe ser mayor a 0", "");
        return;
      }

      const response: any = await createNewCrop(backendApiCall, {
        area: parseInt(formData.area),
        lot_id: lotId,
        name: formData.cropName,
        latitude: formData.latitude,
        longitude: formData.longitude,
      });
      if (response.status === "success") {
        setFormData({
          cropName: "",
          area: "",
          latitude: "",
          longitude: "",
        });
        setRefetch((prev) => prev + 1);
        setShowNotification(true);
        setNotificationDetails({
          title: "Cultivo añadido exitosamente",
          description:
            "¡Excelente! Podrás ver tu nuevo cultivo en la sección de <br />  ‘Ver cultivos del lote’.",
          redirectUrl: "/lots-crops",
        });
        return;
      }
      handleNotification("Error", response.message, "");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const lot = await fetchLotDetails(backendApiCall, lotId as string);
      if (lot) {
        setLotData(lot);
      }
    };
    fetchData();
  }, [backendApiCall, lotId, refetch]);

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  return (
    <div>
      <Navbar />
      <FormContainer>
        <SignBoard $custom2>
          Registros del día hechos en el cultivo ‘Manguito01’{" "}
          <DetailsItem>{lotData.name}</DetailsItem>
        </SignBoard>
        <InfoContainer>
          <DetailsSign>
            Nombre del lote: <DetailsItem>{lotData.available_capacity}</DetailsItem>
          </DetailsSign>
          <DetailsSign>
            Fecha de inicio de recolección: <DetailsItem>{lotData.capacity_in_use}</DetailsItem>
          </DetailsSign>
        </InfoContainer>
        <Description>
          Nota: Siendo administrador puedes ver los registros hechos por los usuarios encargados que
          has asignado a este cultivo. Incluso puedes hacer uno tu.
        </Description>
        <SignBoard $custom2>Parámetros del día para el cultivo</SignBoard>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="eto">Evapotranspiración de referencia (ETo)</Label>
          <Input
            type="text"
            id="eto"
            name="eto"
            //value={formData.eto}
            onChange={handleChange}
            required
          />

          <Label htmlFor="etapaActual">Etapa actual de crecimiento</Label>
          <Input
            type="number"
            id="etapaActual"
            name="etapaActual"
            //value={formData.etapaActual}
            onChange={handleChange}
            required
          />

          <Label htmlFor="etc">Evapotranspiración real del cultivo (ETc)</Label>
          <Input
            type="number"
            id="etc"
            name="etc"
            //value={formData.etc}
            onChange={handleChange}
            required
          />

          <ButtonSubmit type="submit" $custom1>
            Guardar cambios
          </ButtonSubmit>

          <Button type="submit" $custom1>
            Hacer un registro
          </Button>

          <SignBoard $custom3>Registros de datos hechos hoy</SignBoard>
          <Container>
            <Table $custom1>
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
        </Form>
      </FormContainer>
      {showNotification && (
        <NotificationModal
          title={notificationDetails.title}
          description={notificationDetails.description}
          imageUrl={checkLogo}
          buttonText="Aceptar"
          onClose={handleNotificationClose}
          redirectUrl={notificationDetails.redirectUrl}
        />
      )}
    </div>
  );
}
