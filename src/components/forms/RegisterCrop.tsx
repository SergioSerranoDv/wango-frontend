import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationModal } from "../../components/modals/NotificationModal";
import { ApiContext } from "../../context/ApiContext";
import { LotI } from "../../interfaces/Lot";
import { NotificationDataInit, NotificationI } from "../../interfaces/notification";
import { createNewCrop } from "../../services/crop_s";
import {
  DetailsItem,
  DetailsSign,
  Form,
  FormField,
  InfoContainer,
  Input,
  Label,
  FormContainer,
  FormContent,
} from "../../styles/FormStyles";

interface Props {
  lotDetails: LotI;
}

export const RegisterCrop: React.FC<Props> = ({ lotDetails }) => {
  const { backendApiCall } = useContext(ApiContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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
    const { name, area, latitude, longitude } = formData;
    const parsedArea = parseInt(area);
    const parsedLatitude = parseInt(latitude);
    const parsedLongitude = parseInt(longitude);

    if (!lotDetails._id) {
      handleNotification("Error", "No se ha encontrado el ID del lote", "error", "");
      return;
    }

    if (lotDetails.available_capacity === 0) {
      handleNotification("Error", "El lote no tiene capacidad disponible", "error", "");
      return;
    }

    if (parsedArea > lotDetails.available_capacity) {
      handleNotification(
        "Error",
        "El área debe ser menor o igual a la capacidad disponible",
        "error",
        ""
      );
      return;
    }

    if (parsedArea <= 0) {
      handleNotification("Error", "El área debe ser mayor a 0", "error", "");
      return;
    }

    if (parsedLatitude < -90 || parsedLatitude > 90) {
      handleNotification(
        "Error",
        "La latitud debe estar en un rango <br /> entre -90° y 90°",
        "error",
        ""
      );
      return;
    }

    if (parsedLongitude < -180 || parsedLongitude > 180) {
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
        area: parsedArea,
        latitude: parsedLatitude,
        longitude: parsedLongitude,
        name,
        lot_id: lotDetails._id,
      });

      if (response.status === "success") {
        setFormData({
          name: "",
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
        <Form id="crop-form" onSubmit={handleSubmit}>
          <FormContent>
            <FormField>
              <Label htmlFor="name">Nombre del cultivo*</Label>
              <Input type="text" id="name" name="name" onChange={handleChange} required />
            </FormField>

            <FormField>
              <Label htmlFor="area">Área (Ha)*</Label>
              <Input type="number" id="area" name="area" onChange={handleChange} required />
            </FormField>

            <FormField>
              <Label htmlFor="latitude">Latitud (-90° - 90°)*</Label>
              <Input type="number" id="latitude" name="latitude" onChange={handleChange} required />
            </FormField>

            <FormField>
              <Label htmlFor="longitude">Longitud (-180° - 180°)*</Label>
              <Input
                type="number"
                id="longitude"
                name="longitude"
                onChange={handleChange}
                required
              />
            </FormField>
          </FormContent>
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
