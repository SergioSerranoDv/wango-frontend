import React, { useState, ChangeEvent, FormEvent, useContext, useEffect } from "react";
import { NotificationModal } from "./modals/NotificationModal";
import { LoadingAnimation } from "./Loading";
import { NotificationDataInit, NotificationI } from "../interfaces/notification";
import { useGetById } from "../hooks/useGetById";
import { LotI, LotDataInit } from "../interfaces/Lot";
import { ApiContext } from "../context/ApiContext";
import { updateLot } from "../services/lot_s";
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
interface LotFormEditProps {
  lotId: string | undefined;
}
export const LotFormEdit: React.FC<LotFormEditProps> = ({ lotId = "" }) => {
  const { backendApiCall } = useContext(ApiContext);
  const { data, loading } = useGetById({
    endpoint: `v1/lot/info/${lotId}`,
  });
  const [formData, setFormData] = useState<LotI>(LotDataInit);
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
  useEffect(() => {
    if (data && data.name) {
      setFormData({
        name: data.name,
        capacity: data.capacity,
        capacity_in_use: data.capacity_in_use,
        available_capacity: data.available_capacity,
      });
    }
  }, [data]);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCapacity = formData.capacity ?? 0;
    if (newCapacity <= 0) {
      handleNotification("Error", "La capacidad debe ser mayor a 0.", "error", "");
      return;
    }
    try {
      const response = await updateLot(
        backendApiCall,
        {
          _id: lotId,
          available_capacity: formData.capacity,
          capacity: formData.capacity,
          name: formData.name,
        },
        lotId
      );
      if (response.status === "success") {
        setShowNotification(true);
        setNotificationDetails({
          title: "Lote editado exitosamente",
          description: "¡Excelente! El lote ha sido editado exitosamente.",
          status: "success",
          redirectUrl: `/lot-menu/${data._id}`,
        });
      } else {
        handleNotification("Error", "No se pudo editar el lote.", "error", "");
      }
    } catch (error) {
      console.error("Error updating lot:", error);
    }
  };
  const handleNotificationClose = () => {
    setShowNotification(false);
  };
  if (loading) return <LoadingAnimation />;
  return (
    <>
      {!loading && data && (
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <FormHeader>Editar información del lote</FormHeader>
            <FormField>
              <Label htmlFor="name">Nombre del lote*</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
                required
              />
            </FormField>
            <FormField>
              <Label htmlFor="capacidadLote">Capacidad (Ha)*</Label>
              <Input
                id="capacity"
                name="capacity"
                min={0}
                type="number"
                value={formData.capacity?.toString() ?? ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, capacity: parseInt(e.target.value) });
                }}
                required
              />
            </FormField>
            <ButtonContainer>
              <Button type="submit">Guardar cambios</Button>
            </ButtonContainer>
          </Form>
        </FormWrapper>
      )}
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
