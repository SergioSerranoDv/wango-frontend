import React, { useState, ChangeEvent, FormEvent, useContext, useEffect } from "react";
import NotificationModal from "./modals/NotificationModal";
import checkLogo from "../assets/icons/checkLogo.svg";
import { ApiContext } from "../context/ApiContext";
import { saveLot, fetchLotDetails } from "../services/lot_s";

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

function LoteFormEdit({ lotId }: { lotId: string }) {
  const { backendApiCall } = useContext(ApiContext);
  const [formData, setFormData] = useState<FormData>({
    nombreLote: "",
    capacidadLote: "",
  });
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    async function loadLotDetails() {
      const lotDetails = await fetchLotDetails(backendApiCall, lotId);
      if (lotDetails) {
        setFormData({
          nombreLote: lotDetails.name,
          capacidadLote: lotDetails.capacity.toString(),
        });
      }
    }
    loadLotDetails();
  }, [backendApiCall, lotId]);

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
      console.log("Form data:", formData);
      const response = await saveLot(
        backendApiCall,
        {
          name: formData.nombreLote,
          capacity: parseInt(formData.capacidadLote),
        },
        lotId
      );
      if (response.status == "error") {
        alert(response.message);
      }
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
          <FormHeader>Editar lote</FormHeader>
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
            <Button type="submit">Guardar cambios</Button>
          </ButtonContainer>
        </Form>
      </FormWrapper>
      {showNotification && (
        <NotificationModal
          title="Lote editado exitosamente"
          description="Los cambios en el lote han sido guardados correctamente."
          imageUrl={checkLogo}
          buttonText="Aceptar"
          onClose={handleNotificationClose}
          redirectUrl="/Batch-Manage"
        />
      )}
    </>
  );
}

export default LoteFormEdit;
