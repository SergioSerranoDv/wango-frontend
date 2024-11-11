import React, { useContext, useState } from "react";
import { ApiContext } from "../../context/ApiContext";
import { UseNotification } from "../../hooks/UseNotification";
import { Collection } from "../../interfaces/collection";
import { updateCollection } from "../../services/collection_s";
import {
  Button,
  ButtonContainer,
  Form,
  FormField,
  ContentWrapper,
  Label,
  Input,
} from "../../styles/FormStyles";
import { NotificationModal } from "../modals/NotificationModal";

interface Props {
  collection: Collection;
  refetchCollections: React.Dispatch<React.SetStateAction<number>>;
}

export const CollectionFormEdit: React.FC<Props> = ({ collection, refetchCollections }) => {
  const { backendApiCall } = useContext(ApiContext);
  const { closeNotification, notificationDetails, showNotification, triggerNotification } =
    UseNotification();
  const [formData, setFormData] = useState<Collection>(collection);

  const handleSubmit = async () => {
    try {
      const { name } = formData;

      const response = await updateCollection(backendApiCall, collection._id, { name });

      if (response.status === "success") {
        setFormData({ ...formData, name });
        triggerNotification(
          "Colección actualizada exitosamente",
          "¡Excelente! Podrás ver tu colección en la sección de ‘Ver mis colecciones’.",
          "success"
        );
        refetchCollections((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error al crear la colección", error);
      triggerNotification("Error", "Ocurrió un error al crear la colección", "error", "");
    }
  };

  return (
    <>
      <Form
        id="collection-form-update"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <ContentWrapper>
          <FormField>
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
              required
            />
          </FormField>
        </ContentWrapper>
      </Form>

      {showNotification && (
        <NotificationModal
          description={notificationDetails.description}
          buttonText="Aceptar"
          title={notificationDetails.title}
          status={notificationDetails.status}
          onClose={closeNotification}
        />
      )}
    </>
  );
};
