import React, { useState, ChangeEvent, FormEvent, useContext } from "react";
import { NotificationModal } from "./modals/NotificationModal";
import { UseNotification } from "../hooks/UseNotification";
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
  name: string;
  capacity: string;
}

export const LotForm: React.FC = () => {
  const { closeNotification, notificationDetails, showNotification, triggerNotification } =
    UseNotification();
  const { backendApiCall } = useContext(ApiContext);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    capacity: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const area = parseInt(formData.capacity);

      if (area <= 0) {
        triggerNotification("Error", "La capacidad debe ser mayor a 0", "error", "");
        return;
      }

      const response = await createNewLot(backendApiCall, {
        available_capacity: area,
        name: formData.name,
        capacity: area,
        capacity_in_use: 0,
      });

      if (response.status === "success") {
        triggerNotification(
          "Lote añadido exitosamente",
          "¡Excelente! Podrás ver tu nuevo lote en la sección de <br />  ‘Ver mis lotes’.",
          "success",
          "/lots-manage"
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          {/* <FormHeader>Crea un nuevo lote, ingresa los datos</FormHeader> */}
          <FormField>
            <Label htmlFor="name">Nombre del lote*</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField>
            <Label htmlFor="capacity">Capacidad (Ha)*</Label>
            <Input
              id="capacity"
              name="capacity"
              type="number"
              value={formData.capacity}
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
          onClose={closeNotification}
          redirectUrl={notificationDetails.redirectUrl}
        />
      )}
    </>
  );
};
