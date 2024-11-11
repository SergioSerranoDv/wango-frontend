import React, { useState, useContext, ChangeEvent, FormEvent } from "react";
import { ApiContext } from "../context/ApiContext";
import { UseNotification } from "../hooks/UseNotification";
import { Crop } from "../interfaces/crop";
import { updateCrop } from "../services/crop_s";
import { Button, Form, Label, Input, FormContainer, ButtonContainer } from "../styles/FormStyles";
import { NotificationModal } from "./modals/NotificationModal";

interface FormData {
  name: string;
  area: number;
  latitude: number;
  longitude: number;
}
interface Props {
  crop: Crop;
}

export const CropFormEdit: React.FC<Props> = ({ crop }) => {
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
      [name]: value, // Esto actualiza el valor del campo correspondiente
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await updateCrop(
        backendApiCall,
        {
          _id: crop._id,
          name: formData.name,
          area: formData.area,
          lot_id: crop.lot_id,
          latitude: formData.latitude,
          longitude: formData.longitude,
          status_data_collection: crop.status_data_collection,
        },
        crop._id
      );
      if (response.status === "success") {
        triggerNotification(
          "Cultivo editado exitosamente",
          "¡Excelente! El cultivo ha sido editado exitosamente.",
          "success",
          ""
        );
      } else {
        triggerNotification("Error", "No se pudo editar el cultivo.", "error", "");
      }
    } catch (error) {
      console.error("Error updating crop:", error);
    }
  };

  return (
    <>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="name">Nombre del cultivo*</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name} // Asegúrate de que el valor esté vinculado a formData.cropName
            onChange={handleChange}
            required
          />
          <Label htmlFor="area">Área (Ha)*</Label>
          <Input
            type="number"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            disabled
          />
          <Label htmlFor="latitude">Latitud (°)*</Label>
          <Input
            type="number"
            id="latitude"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
          />
          <Label htmlFor="longitude">Longitud (°)*</Label>
          <Input
            type="number"
            id="longitude"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
          />
          <ButtonContainer>
            <Button type="submit">Guardar cambios</Button>
          </ButtonContainer>
        </Form>
      </FormContainer>

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
