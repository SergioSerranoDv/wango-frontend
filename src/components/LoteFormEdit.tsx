import React, { useState, ChangeEvent, FormEvent, useContext, useEffect } from "react";
import NotificationModal from "./modals/NotificationModal";
import checkLogo from "../assets/icons/checkLogo.svg";
import { ApiContext } from "../context/ApiContext";
import { fetchLotDetails, saveLot } from "../services/lot_s";

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

interface Props {
  lotId?: string;
  userId: string;
}

function LoteFormEdit({ lotId = "", userId }: Props) {
  // Proporcionar un valor predeterminado para lotId
  const { backendApiCall } = useContext(ApiContext);
  const [formData, setFormData] = useState<FormData>({
    nombreLote: "",
    capacidadLote: "",
  });
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    async function loadLotDetails() {
      if (lotId) {
        const lots = await fetchLotDetails(backendApiCall, userId); // Suponiendo que userId está definido en tu componente
        if (lots) {
          const lot = lots.find(lot => lot.name === lotId); // Encuentra el lote con el nombre correspondiente
          if (lot) {
            setFormData({
              nombreLote: lot.name,
              capacidadLote: lot.capacity.toString(),
            });
          }
        }
      }
    }
    loadLotDetails();
  }, [backendApiCall, lotId, userId]);

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
        lotId // No es necesario manejar lotId como cadena vacía aquí
      );
      if (response.status === "error") {
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
