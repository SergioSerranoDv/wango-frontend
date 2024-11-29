import React, { useState, useContext, ChangeEvent, FormEvent } from "react";
import { ApiContext } from "../context/ApiContext";
import { UseNotification } from "../hooks/UseNotification";
import { Crop } from "../interfaces/crop";
import { updateCrop } from "../services/crop_s";
import { Form, Label, Input, FormField, FormContent } from "../styles/FormStyles";
import { NotificationModal } from "./modals/NotificationModal";

interface FormData {
  name: string;
  area: number;
  latitude: number;
  longitude: number;
}
interface Props {
  crop: Crop;
  refetchData: () => void;
}

export const CropFormEdit: React.FC<Props> = ({ crop, refetchData }) => {
  const { closeNotification, notificationDetails, showNotification, triggerNotification } =
    UseNotification();
  const { backendApiCall } = useContext(ApiContext);
  const [formData, setFormData] = useState<FormData>({
    name: crop.name,
    area: crop.area,
    latitude: crop.latitude,
    longitude: crop.longitude,
  });

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
      const updatedFormData = {
        name: formData.name.trim(),
        area: formData.area,
        latitude: formData.latitude,
        longitude: formData.longitude,
      };

      const isDataUnchanged =
        updatedFormData.name === crop.name.trim() &&
        updatedFormData.area === crop.area &&
        updatedFormData.latitude === crop.latitude &&
        updatedFormData.longitude === crop.longitude;

      if (isDataUnchanged) {
        triggerNotification("Sin cambios", "No se realizaron modificaciones.", "info", "");
        return;
      }

      const payload = {
        _id: crop._id,
        ...updatedFormData,
        lot_id: crop.lot_id,
        status_data_collection: crop.status_data_collection,
      };

      const response = await updateCrop(backendApiCall, payload, crop._id);

      if (response.status === "success") {
        refetchData();
        triggerNotification(
          "Cultivo editado exitosamente",
          "¡Excelente! El cultivo ha sido editado exitosamente.",
          "success",
          ""
        );
      } else {
        throw new Error("Error al actualizar el cultivo.");
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
      <Form id="crop-form-update" onSubmit={handleSubmit}>
        <FormContent>
          <FormField>
            <Label htmlFor="name">Nombre del cultivo*</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField>
            <Label htmlFor="area">Área (Ha)*</Label>
            <Input
              type="number"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              disabled
              required
            />
          </FormField>
          <FormField>
            <Label htmlFor="latitude">Latitud (-90° - 90°)*</Label>
            <Input
              type="number"
              id="latitude"
              name="latitude"
              max={90}
              min={-90}
              value={formData.latitude}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField>
            <Label htmlFor="longitude">Longitud (-180° - 180°)*</Label>
            <Input
              type="number"
              id="longitude"
              name="longitude"
              max={180}
              min={-180}
              value={formData.longitude}
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
        />
      )}
    </>
  );
};
