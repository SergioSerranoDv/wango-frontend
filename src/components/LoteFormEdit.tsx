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
}

function LoteFormEdit({ lotId = "" }: Props) {
  const { backendApiCall } = useContext(ApiContext);
  const [formData, setFormData] = useState<FormData>({
    nombreLote: "",
    capacidadLote: "",
  });
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [lot, setLot] = useState<any>(null);

  useEffect(() => {
    async function loadLotDetails() {
      if (lotId) {
        try {
          const lotDetails = await fetchLotDetails(backendApiCall, lotId);
          if (lotDetails) {
            const { name, capacity } = lotDetails;
            setFormData({
              nombreLote: name,
              capacidadLote: capacity.toString(),
            });
            setLot(lotDetails);
          }
        } catch (error) {
          console.error("Error fetching lot details:", error);
        }
      }
    }
    loadLotDetails();
  }, [backendApiCall, lotId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await saveLot(
        backendApiCall,
        {
          _id: lotId,
          available_capacity: parseInt(formData.capacidadLote),
          capacity: parseInt(formData.capacidadLote),
          name: formData.nombreLote,
        },
        lotId
      );
      if (response.status === "error") {
        alert(response.message);
      } else {
        setShowNotification(true);
      }
    } catch (error) {
      console.error("Error updating lot:", error);
    }
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
    if (lot && lot._id) {
      window.location.href = `/lote-menu/${lot._id}`;
    }
  };

  return (
    <>
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <FormHeader>Editar información del lote</FormHeader>
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
              type="number"
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
          description="Los cambios en el lote han sido guardados <br /> correctamente."
          imageUrl={checkLogo}
          buttonText="Aceptar"
          onClose={handleNotificationClose}
        />
      )}
    </>
  );
}

export default LoteFormEdit;
