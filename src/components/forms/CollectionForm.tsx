import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../../context/ApiContext";
import { UseGet } from "../../hooks/UseGet";
import { UseNotification } from "../../hooks/UseNotification";
import { createNewCollection } from "../../services/collection_s";
import { Button, Form, FormField, Label, Input, FormContent } from "../../styles/FormStyles";
import { LoadingAnimation } from "../Loading";
import { NotificationModal } from "../modals/NotificationModal";

interface Props {
  cropId: string;
}

export const CollectionForm: React.FC<Props> = ({ cropId }) => {
  const navigate = useNavigate();
  const { backendApiCall } = useContext(ApiContext);
  const { data, loading } = UseGet({
    endpoint: `collection/info/crop/${cropId}`,
  });
  const { closeNotification, notificationDetails, showNotification, triggerNotification } =
    UseNotification();
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    try {
      if (!name) return;

      const response = await createNewCollection(backendApiCall, { crop_id: cropId, name });

      if (response.status === "success") {
        setName("");
        triggerNotification(
          "Colección añadida exitosamente",
          "¡Excelente! Podrás ver tu nueva colección en la sección de ‘Ver mis colecciones’.",
          "success",
          "/collections-manage"
        );
      }
    } catch (error) {
      console.error("Error al crear la colección", error);
      triggerNotification("Error", "Ocurrió un error al crear la colección", "error", "");
    }
  };

  return (
    <>
      {loading ? (
        <LoadingAnimation />
      ) : data && data.status === "in_progress" ? (
        <div>
          <p>Ya tienes una recolección en progreso</p>
          <p>Nombre: {data.name}</p>
          <p>Fecha de inicio: {data.createdAt}</p>
          <Button onClick={() => navigate(`/dashboard/collections/${cropId}`)}>
            Ver recolección
          </Button>
        </div>
      ) : (
        <Form
          id="collection-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <FormContent>
            <FormField>
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormField>
          </FormContent>
        </Form>
      )}

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
