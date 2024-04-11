import React, { useState, ChangeEvent, FormEvent, useContext, useEffect } from "react";
import NotificationModal from "./modals/NotificationModal";
import errorLogo from "../assets/icons/errorLogo.svg";
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
  capacidadUso: string;
  capacidadDisponible: string;
}

interface Props {
  lotId?: string;
}

function LoteFormEdit({ lotId = "" }: Props) {
  const { backendApiCall } = useContext(ApiContext);
  const [formData, setFormData] = useState<FormData>({
    nombreLote: "",
    capacidadLote: "",
    capacidadUso: "",
    capacidadDisponible: "",
  });
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationDetails, setNotificationDetails] = useState({
    title: "",
    description: "",
    imageUrl: "",
    redirectUrl: "",
  });
  const [lot, setLot] = useState<any>(null);

  const handleNotification = (
    title: string,
    description: string,
    imageUrl: string,
    redirectUrl: string
  ) => {
    setNotificationDetails({ title, description, imageUrl, redirectUrl });
    setShowNotification(true);
  };

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
              capacidadUso: capacity.toString(),
              capacidadDisponible: capacity.toString(),
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

    setFormData((prevData) => {
      let nuevaCapacidadDisponible = prevData.capacidadDisponible;

      if (name === "capacidadLote") {
        const nuevaCapacidadLote = parseInt(value);
        const capacidadPrevDisponible = parseInt(prevData.capacidadDisponible);
        const cambioEnCapacidad = nuevaCapacidadLote - parseInt(prevData.capacidadLote);
        nuevaCapacidadDisponible = (capacidadPrevDisponible + cambioEnCapacidad).toString();
      }

      return {
        ...prevData,
        [name]: value,
        capacidadDisponible:
          name === "capacidadLote" ? nuevaCapacidadDisponible : prevData.capacidadDisponible,
        capacidadUso: name === "capacidadLote" ? value : prevData.capacidadUso,
      };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCapacity = parseInt(formData.capacidadLote);
  
    if (newCapacity < 0) {
      handleNotification("Error", "La capacidad debe ser mayor a 0.", errorLogo, "");
      return;
    }
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
        setNotificationDetails({
          title: "Lote editado exitosamente",
          description:
            "¡Excelente! El lote ha sido editado exitosamente.",
          imageUrl: checkLogo,
          redirectUrl: `/lot-menu/${lot._id}`,
        });
      }
    } catch (error) {
      console.error("Error updating lot:", error);
    }
  };
  

  const handleNotificationClose = () => {
    setShowNotification(false);
    if (lot && lot._id) {
    }
  };

  return (
    <>
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <FormHeader>Editar información del lote</FormHeader>
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
            <Button type="submit">Guardar cambios</Button>
          </ButtonContainer>
        </Form>
      </FormWrapper>
      {showNotification && (
        <NotificationModal
          title={notificationDetails.title}
          description={notificationDetails.description}
          imageUrl={notificationDetails.imageUrl}
          buttonText="Aceptar"
          onClose={handleNotificationClose}
          redirectUrl={notificationDetails.redirectUrl}
        />
      )}
    </>
  );
}

export default LoteFormEdit;
