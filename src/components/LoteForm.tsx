import React, { useState, ChangeEvent, FormEvent } from "react";
import NotificationModal from "./modals/NotificationModal";
import checkLogo from "../assets/icons/checkLogo.svg";

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
  capacity: number | "";
}

function LoteForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    capacity: "",
  });
  const [showNotification, setShowNotification] = useState(false);

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
      const response = await fetch("http://localhost:3230/api/lotes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      console.log("Response:", responseData);
      setFormData({
        name: "",
        capacity: "",
      });
      setShowNotification(true);
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
              type="text"
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
          title="Lote añadido exitosamente"
          description="Excelente! Podrás ver tu nuevo lote en la sección <br /> de ‘Mis lotes’."
          imageUrl={checkLogo}
          buttonText="Aceptar"
          onClose={handleNotificationClose}
          redirectUrl="/BatchManage"
        />
      )}
    </>
  );
}

export default LoteForm;
