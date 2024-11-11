import React, { useState, useContext } from "react";
import { NotificationModal } from "../../components/modals/NotificationModal";
import { ApiContext } from "../../context/ApiContext";
import { UseNotification } from "../../hooks/UseNotification";
import { ProductI } from "../../interfaces/Product";
import { updateProductById } from "../../services/product_s";
import { Form, Input, Label, FormContent, SelectInput, FormField } from "../../styles/FormStyles";

interface Props {
  product: ProductI;
  refetchProductDetails: React.Dispatch<React.SetStateAction<number>>;
}

export const ProductFormEdit: React.FC<Props> = ({ product }) => {
  const { backendApiCall } = useContext(ApiContext);
  const { closeNotification, showNotification, notificationDetails, triggerNotification } =
    UseNotification();
  const [formData, setFormData] = useState({
    code: product.code,
    description: product.description,
    name: product.name,
    type: product.type,
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
      const response = await updateProductById(backendApiCall, formData, product._id);

      if (response.status === "error") {
        resetForm();
        triggerNotification("Error", "Ocurrió un error al actualizar el producto", "error", "");
        return;
      }

      triggerNotification(
        "Producto actualizado exitosamente",
        "¡Excelente! Podrás ver tu producto en la sección de ‘Ver mis productos’.",
        "success"
      );
    } catch (error) {
      triggerNotification("Error", "Ocurrió un error al actualizar el producto", "error", "");
    }
  };

  return (
    <>
      <Form id="product-form-update" onSubmit={handleSubmit}>
        <FormContent>
          <FormField>
            <Label htmlFor="name">Nombre del producto</Label>
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
            <Label htmlFor="type">Tipo</Label>
            <SelectInput
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
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
