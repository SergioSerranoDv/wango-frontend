import React, { useState, ChangeEvent, FormEvent, useContext } from "react";
import { ApiContext } from "../../context/ApiContext";
import { UseNotification } from "../../hooks/UseNotification";
import { LotI } from "../../interfaces/Lot";
import { updateLotById } from "../../services/lot_s";
import { Label, Form, Input, FormContent, FormField } from "../../styles/FormStyles";
import { NotificationModal } from "../modals/NotificationModal";

interface Props {
  data: any;
  refetchData: () => void;
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
      const updatedFormData = {
        name: formData.name.trim(),
        capacity: newCapacity,
      };

      const isDataUnchanged = {
        name: updatedFormData.name === data.name.trim(),
        capacity: updatedFormData.capacity === data.capacity,
      };

      if (isDataUnchanged.name && isDataUnchanged.capacity) {
        triggerNotification("Sin cambios", "No se realizaron modificaciones.", "info");
        return;
      }

      const payload = {
        _id: data._id,
        available_capacity: newCapacity - data.capacity_in_use,
        capacity: newCapacity,
        name: updatedFormData.name,
      };

      const response = await updateLotById(backendApiCall, payload, data._id);

      if (response.status === "success") {
        refetchData();
        triggerNotification(
          "Lote editado exitosamente",
          "¡Excelente! El lote ha sido editado exitosamente.",
          "success",
          ""
        );
      }
    } catch (error) {
      triggerNotification(
        "Error inesperado",
        error instanceof Error ? error.message : "Ocurrió un error inesperado.",
        "error",
        ""
      );
    }
  };

  return (
    <>
      <Form id="lot-form-update" onSubmit={handleSubmit}>
        <FormContent>
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
        </FormContent>
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
