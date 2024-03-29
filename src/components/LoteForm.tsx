import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
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
  nombreLote: string;
  capacidadLote: string;
}

function LoteForm() {
  const [formData, setFormData] = useState<FormData>({
    nombreLote: "",
    capacidadLote: "",
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
      const response = await axios.post("http://localhost:3230/api/lotes/", formData);
      console.log("Response:", response.data);
      setFormData({
        nombreLote: "",
        capacidadLote: "",
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
            <Label htmlFor="nombreLote">Nombre del lote</Label>
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
            <Label htmlFor="capacidadLote">Capacidad</Label>
            <Input
              id="capacidadLote"
              name="capacidadLote"
              type="text"
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
