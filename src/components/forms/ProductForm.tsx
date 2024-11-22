import React, { useState, useContext } from "react";
import { ApiContext } from "../../context/ApiContext";
import { UseNotification } from "../../hooks/UseNotification";
import { createProduct } from "../../services/product_s";
import {
  Form,
  Input,
  Label,
  FormField,
  FormContainer,
  SelectInput,
  FormContent,
} from "../../styles/FormStyles";
import { NotificationModal } from "../modals/NotificationModal";

interface Props {
  closeModal: () => void;
  refetchProductDetails: React.Dispatch<React.SetStateAction<number>>;
}

export const ProductForm: React.FC<Props> = ({ closeModal, refetchProductDetails }) => {
  const { backendApiCall } = useContext(ApiContext);
  const { closeNotification, showNotification, notificationDetails, triggerNotification } =
    UseNotification();
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    name: "",
    type: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      code: "",
      description: "",
      name: "",
      type: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      console.log(formData.type);
      const response = await createProduct(backendApiCall, formData);
      if (response.status === "error") {
        resetForm();
        triggerNotification("Error", "Ocurrió un error al crear el producto", "error", "");
        return;
      }
      triggerNotification(
        "Producto creado exitosamente",
        "¡Excelente! Podrás ver tu producto en la sección de ‘Ver mis productos’.",
        "success"
      );
      refetchProductDetails((prev) => prev + 1);
      closeModal();
    } catch (error) {
      triggerNotification("Error", "Ocurrió un error al crear el producto", "error", "");
    }
  };

  return (
    <>
      <FormContainer>
        <Form id="product-form" onSubmit={handleSubmit}>
          <FormContent>
            <FormField>
              <Label htmlFor="name">Nombre del producto*</Label>
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
              <Label htmlFor="code">Codigo de registro (ICA)*</Label>
              <Input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
              />
            </FormField>
            <FormField>
              <Label htmlFor="type">Tipo*</Label>
              <SelectInput
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un tipo</option>
                <option value="pesticide">Pesticida</option>
                <option value="fertilizer">Fertilizante</option>
                <option value="fungicide">Fungicida</option>
                <option value="insecticide">Insecticida</option>
                <option value="additive">Aditivo</option>
                <option value="other">Otro</option>
              </SelectInput>
            </FormField>
            <FormField>
              <Label htmlFor="description">Descripción</Label>
              <Input
                type="description"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </FormField>
          </FormContent>
        </Form>
      </FormContainer>
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
