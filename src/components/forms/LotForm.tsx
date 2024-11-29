import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { UseNotification } from "../..//hooks/UseNotification";
import { ApiContext } from "../../context/ApiContext";
import { createNewLot } from "../../services/lot_s";
import { Form, FormContent, FormField, Input, Label } from "../../styles/FormStyles";
import { NotificationModal } from "../modals/NotificationModal";

interface FormData {
  name: string;
  capacity: string;
}

interface LotFormProps {
  refetchLotDetails: () => void;
}

export const LotForm: React.FC<LotFormProps> = ({ refetchLotDetails }) => {
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

      const payload = {
        available_capacity: area,
        name: formData.name,
        capacity: area,
        capacity_in_use: 0,
      };

      const response = await createNewLot(backendApiCall, payload);

      if (response.status === "success") {
        refetchLotDetails();
        triggerNotification(
          "Lote añadido exitosamente",
          "¡Excelente! El lote ha sido añadido exitosamente.",
          "success"
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
      <Form id="lot-form" onSubmit={handleSubmit}>
        <FormContent>
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
