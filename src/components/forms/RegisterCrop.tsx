import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationModal } from "../../components/modals/NotificationModal";
import { ApiContext } from "../../context/ApiContext";
import { createNewCrop } from "../../services/crop_s";
import { LotI } from "../../interfaces/Lot";
import { NotificationDataInit, NotificationI } from "../../interfaces/notification";
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
} from "../../styles/FormStyles";

interface Props {
  lotDetails: LotI;
}

export const RegisterCrop: React.FC<Props> = ({ lotDetails }) => {
  const { backendApiCall } = useContext(ApiContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cropName: "",
    area: "",
    latitude: "",
    longitude: "",
  });
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationDetails, setNotificationDetails] =
    useState<NotificationI>(NotificationDataInit);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotification = (
    title: string,
    description: string,
    status: string,
    redirectUrl: string
  ) => {
    setNotificationDetails({ title, description, status, redirectUrl });
    setShowNotification(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lotDetails._id) {
      handleNotification("Error", "No se ha encontrado el ID del lote", "error", "");
      return;
    }
    if (lotDetails.available_capacity === 0) {
      handleNotification("Error", "El lote no tiene capacidad disponible", "error", "");
      return;
    }
    if (parseInt(formData.area) > lotDetails.available_capacity) {
      handleNotification(
        "Error",
        "El área debe ser menor o igual a la capacidad disponible",
        "error",
        ""
      );
      return;
    }
    if (parseInt(formData.area) <= 0) {
      handleNotification("Error", "El área debe ser mayor a 0", "error", "");
      return;
    }
    if (parseInt(formData.latitude) < -90 || parseInt(formData.latitude) > 90) {
      handleNotification(
        "Error",
        "La latitud debe estar en un rango <br /> entre -90° y 90°",
        "error",
        ""
      );
      return;
    }
    if (parseInt(formData.longitude) < -180 || parseInt(formData.longitude) > 180) {
      handleNotification(
        "Error",
        "La longitud debe estar en un rango <br /> entre -90° y 90°",
        "error",
        ""
      );
      return;
    }
    try {
      const response = await createNewCrop(backendApiCall, {
        area: parseInt(formData.area),
        lot_id: lotDetails._id,
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
        setShowNotification(true);
        setNotificationDetails({
          title: "Cultivo añadido exitosamente",
          description:
            "¡Excelente! Podrás ver tu nuevo cultivo en la sección de <br />  ‘Ver cultivos del lote’.",
          status: "success",
        });
        navigate(`/dashboard/crops/${lotDetails._id}`);
        return;
      }
      handleNotification("Error", response.message, "", "");
    } catch (error) {
      console.error(error);
    }
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  return (
    <>
      <FormContainer>
        <InfoContainer>
          <DetailsSign>
            Área disponible: <DetailsItem>{lotDetails.available_capacity} Ha</DetailsItem>
          </DetailsSign>
          <DetailsSign>
            Área en ocupación: <DetailsItem>{lotDetails.capacity_in_use} Ha</DetailsItem>
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

          <Label htmlFor="latitude">Latitud (-90° - 90°)*</Label>
          <Input
            type="number"
            id="latitude"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            required
          />

          <Label htmlFor="longitude">Longitud (-180° - 180°)*</Label>
          <Input
            type="number"
            id="longitude"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
          />
          <Button type="submit" $custom2>
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
          status={notificationDetails.status}
          buttonText="Aceptar"
          onClose={handleNotificationClose}
          redirectUrl={notificationDetails.redirectUrl}
        />
      )}
    </>
  );
};
