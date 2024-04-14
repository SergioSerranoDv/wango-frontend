import React, { useState, useContext, useEffect } from "react";
import { Lot } from "../interfaces/Lot";
import { redirect, useParams } from "react-router-dom";
import { fetchLotDetails } from "../services/lot_s";
import { ApiContext } from "../context/ApiContext";
import NotificationModal from "../components/modals/NotificationModal";
import checkLogo from "../assets/icons/checkLogo.svg";
import errorLogo  from "../assets/icons/errorLogo.svg";
import Navbar from "../components/Navbar";
import {
  Button,
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

import { createNewCrop } from "../services/crop_s";

export default function NewCrop() {
  const { id } = useParams();
  const lotId = id;
  const { backendApiCall } = useContext(ApiContext);
  const [refetch, setRefetch] = useState<number>(0);
  const [lotData, setLotData] = useState({} as Lot);
  const navigate = useNavigate();
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
    imageUrl: "",
    redirectUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotification = (title: string, description: string, imageUrl: string, redirectUrl: string) => {
    setNotificationDetails({ title, description, imageUrl, redirectUrl });
    setShowNotification(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!lotId) {
        handleNotification("Error", "No se ha encontrado el ID del lote", errorLogo, "");
        return;
      }
      if (lotData.available_capacity === 0) {
        handleNotification("Error", "El lote no tiene capacidad disponible", errorLogo, "");
        return;
      }
      if (parseInt(formData.area) > lotData.available_capacity) {
        handleNotification("Error", "El área debe ser menor o igual a la capacidad disponible", errorLogo, "");
        return;
      }
      if (parseInt(formData.area) <= 0) {
        handleNotification("Error", "El área debe ser mayor a 0", errorLogo, "");
        return;
      }
      if ((parseInt(formData.latitude) < -90) || ((parseInt(formData.latitude) > 90))) {
        handleNotification("Error", "La latitud debe estar en un rango <br /> entre -90° y 90°", errorLogo, "");
        return;
      }
      if ((parseInt(formData.longitude) < -90) || ((parseInt(formData.longitude) > 90))) {
        handleNotification("Error", "La longitud debe estar en un rango <br /> entre -90° y 90°", errorLogo, "");
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
          imageUrl: errorLogo,
          redirectUrl: `/lot-menu/crops/${lotId}`,
        });
        return;
      }
      handleNotification("Error", response.message, "", "");
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
    navigate(`/lot-menu/crops/${lotId}`);
  };

  return (
    <div>
      <Navbar />
      <FormContainer>
        <SignBoard>
          Agrega un nuevo cultivo al lote <DetailsItem>{lotData.name}</DetailsItem>
          <br />
          <br /> <br />{" "}
        </SignBoard>
        <InfoContainer>
          <DetailsSign>
            Área disponible: <DetailsItem>{lotData.available_capacity} Ha</DetailsItem>
          </DetailsSign>
          <DetailsSign>
            Área en ocupación: <DetailsItem>{lotData.capacity_in_use} Ha</DetailsItem>
          </DetailsSign>
        </InfoContainer>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="cropName">Nombre del cultivo*</Label>
          <Input
            type="text"
            id="cropName"
            name="cropName"
            value={formData.cropName}
            onChange={handleChange}
            required
          />

          <Label htmlFor="area">Área (Ha)*</Label>
          <Input
            type="number"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
          />

          <Label htmlFor="latitude">Latitud (°)*</Label>
          <Input
            type="number"
            id="latitude"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            required
          />

          <Label htmlFor="longitude">Longitud (°)*</Label>
          <Input
            type="number"
            id="longitude"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
          />
          <Button type="submit" $custom1>
            Añadir cultivo
          </Button>

          <Description $custom1>
            Podrás añadir un encargado a este cultivo en la sección de ‘Mis cultivos’ en el menú
            principal.
          </Description>
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
