import React, { useState, ChangeEvent, FormEvent, useContext } from "react";
import { NotificationModal } from "./modals/NotificationModal";
import { NotificationDataInit, NotificationI } from "../interfaces/notification";
import { ApiContext } from "../context/ApiContext";
import { createNewLot } from "../services/lot_s";
import {
  FormWrapper,
  Form,
  FormHeader,
  FormField,
  Label,
  Input,
  ButtonContainer,
  Button,
} from "../styles/AddLoteStyles";

interface FormData {
  nombreLote: string;
  capacidadLote: string;
  capacidadUso: string;
  capacidadDisponible: string;
}

export const LotForm: React.FC = () => {
  const { backendApiCall } = useContext(ApiContext);
  const [formData, setFormData] = useState<FormData>({
    nombreLote: "",
    capacidadLote: "",
    capacidadUso: "",
    capacidadDisponible: "",
  });
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationDetails, setNotificationDetails] =
    useState<NotificationI>(NotificationDataInit);

  const handleNotification = (
    title: string,
    description: string,
    status: string,
    redirectUrl: string
  ) => {
    setNotificationDetails({ title, description, status, redirectUrl });
    setShowNotification(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      capacidadUso: value,
      capacidadDisponible: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("Form data:", formData);
      const area = parseInt(formData.capacidadLote);
      if (area <= 0) {
        handleNotification("Error", "La capacidad debe ser mayor a 0", "error", "");
        return;
      }

      const response = await createNewLot(backendApiCall, {
        available_capacity: area,
        name: formData.nombreLote,
        capacity: area,
      });

      if (response.status === "error") {
        alert(response.message);
      }
      setShowNotification(true);
      setNotificationDetails({
        title: "Lote añadido exitosamente",
        description:
          "¡Excelente! Podrás ver tu nuevo lote en la sección de <br />  ‘Ver mis lotes’.",
        status: "success",
        redirectUrl: "/lots-manage",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  return (
    <>
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <FormHeader>Crea un nuevo lote, ingresa los datos</FormHeader>
          <FormField>
            <Label htmlFor="nombreLote">Nombre del lote*</Label>
            <Input
              id="nombreLote"
              name="nombreLote"
              type="text"
              value={formData.nombreLote}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField>
            <Label htmlFor="capacidadLote">Capacidad (Ha)*</Label>
            <Input
              id="capacidadLote"
              name="capacidadLote"
              type="number"
              value={formData.capacidadLote}
              onChange={handleChange}
              required
            />
          </FormField>
          <ButtonContainer>
            <Button type="submit">Añadir Lote</Button>
          </ButtonContainer>
          <FormHeader>
            Podrás añadir un cultivo entrando al lote en específico en la sección anterior.
          </FormHeader>
        </Form>
      </FormWrapper>
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
