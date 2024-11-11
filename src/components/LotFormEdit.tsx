import React, { useState, ChangeEvent, FormEvent, useContext, SetStateAction } from "react";
import { ApiContext } from "../context/ApiContext";
import { UseNotification } from "../hooks/UseNotification";
import { LotI } from "../interfaces/Lot";
import { updateLot } from "../services/lot_s";
import { Label, Form, Input, ContentWrapper, FormField } from "../styles/FormStyles";
import { NotificationModal } from "./modals/NotificationModal";

interface Props {
  data: any;
  refetchData: React.Dispatch<SetStateAction<number>>;
}

export const LotFormEdit: React.FC<Props> = ({ data, refetchData }) => {
  const { backendApiCall } = useContext(ApiContext);
  const { closeNotification, notificationDetails, showNotification, triggerNotification } =
    UseNotification();
  const [formData, setFormData] = useState<LotI>(data);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCapacity = formData.capacity ?? 0;

    if (newCapacity <= 0) {
      triggerNotification("Error", "La capacidad debe ser mayor a 0.", "error", "");
      return;
    }

    try {
      const response = await updateLot(
        backendApiCall,
        {
          _id: data._id,
          available_capacity: formData.capacity - data.capacity_in_use,
          capacity: formData.capacity,
          name: formData.name,
        },
        data._id
      );

      if (response.status === "success") {
        refetchData((prev) => prev + 1);
        triggerNotification(
          "Lote editado exitosamente",
          "¡Excelente! El lote ha sido editado exitosamente.",
          "success",
          ""
        );
      } else {
        triggerNotification("Error", "No se pudo editar el lote.", "error", "");
      }
    } catch (error) {
      console.error("Error updating lot:", error);
    }
  };

  return (
    <>
      <Form id="editLot" onSubmit={handleSubmit}>
        <ContentWrapper>
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
        </ContentWrapper>
      </Form>

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
