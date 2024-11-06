import React, { useState, useContext, useEffect } from "react";
import { NotificationModal } from "../../components/modals/NotificationModal";
import { ApiContext } from "../../context/ApiContext";
import { AppContext } from "../../context/AppContext";
import { createNewRecords, updateRecord } from "../../services/record_s";
import {
  SignBoard,
  InfoContainer,
  DetailsSign,
  Form,
  Input,
  Label,
  ButtonContainer,
  Button,
  Description,
  DetailsItem,
} from "../../styles/components/FormModalStyles";
import { ProductSearch } from "../ProductSearch";

interface AddRegistryProps {
  collectionId: string;
  cropname: string;
  eto: number;
  currentGrowth: number;
  etc: number;
  onClose: () => void;
  setRefetch: React.Dispatch<React.SetStateAction<number>>;
  recordId?: string;
  initialData?: {
    recordName: string;
    eto: number;
    performance: number;
    etc: number;
  };
}

export const AddRegistry: React.FC<AddRegistryProps> = ({
  collectionId,
  cropname,
  eto,
  currentGrowth,
  etc,
  onClose,
  setRefetch,
  recordId,
  initialData,
}) => {
  const { userData } = useContext(AppContext);
  const { backendApiCall } = useContext(ApiContext);
  const [formData, setFormData] = useState({
    nameRecord: initialData?.recordName || "",
    eto: initialData?.eto || eto,
    performance: initialData?.performance || 0,
    etc: initialData?.etc || etc,
  });
  const [productsSelected, setProductsSelected] = useState<any[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState({
    title: "",
    description: "",
    status: "",
    redirectUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    try {
      // Construye los datos del registro basado en el estado del formulario
      console.log(productsSelected);
      const recordData = {
        chemicals_used: productsSelected.map((product) => ({
          product_id: product._id,
          amount: product.quantity,
        })),
        actual_crop_evapotranspiration: formData.etc,
        collection_id: collectionId,
        current_stage: currentGrowth,
        daily_performance: formData.performance,
        name: formData.nameRecord,
        reference_evotranspiration: formData.eto,
        user: userData.user,
      };

      let response;
      if (recordId) {
        // Si existe un recordId, actualiza el registro existente
        response = await updateRecord(backendApiCall, recordData, recordId);
      } else {
        // Si no existe un recordId, crea un nuevo registro
        response = await createNewRecords(backendApiCall, recordData);
      }

      // Maneja la respuesta del servidor
      if (response.status === "success") {
        // Si la respuesta es exitosa, muestra una notificación de éxito
        const title = recordId ? "Registro actualizado" : "Registro creado";
        const description = recordId
          ? "Has actualizado exitosamente el registro."
          : "Has creado un registro, podrás hacer otro en 24 horas.";

        setNotificationDetails({
          title,
          description,
          status: "success",
          redirectUrl: "",
        });
      } else if (
        response.status === "error" &&
        response.message === "You can only create a record once a day"
      ) {
        // Si el usuario ya ha creado un registro hoy, muestra una notificación de error
        setNotificationDetails({
          title: "Ya has creado un registro hoy",
          description: "Recuerda que solo puedes crear un registro cada 24 horas.",
          status: "error",
          redirectUrl: "",
        });
      } else {
        // Si hay un error, muestra una notificación de error
        setNotificationDetails({
          title: "Error",
          description: response.message || "Ha ocurrido un error al procesar tu solicitud.",
          status: "error",
          redirectUrl: "",
        });
      }
      setShowNotification(true); // Muestra la notificación
      setRefetch((prev) => prev + 1); // Actualiza el estado para refrescar los datos si es necesario
    } catch (error) {
      console.error(error); // Registra el error en la consola
      // Muestra una notificación de error
      setNotificationDetails({
        title: "Error inesperado",
        description: "Ha ocurrido un error inesperado. Por favor, intenta de nuevo más tarde.",
        status: "error",
        redirectUrl: "",
      });
      setShowNotification(true);
    }
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
    onClose();
  };

  return (
    <>
      <SignBoard $custom2>
        Haz tu registro diario para el cultivo <DetailsItem>{cropname}</DetailsItem>
      </SignBoard>
      <InfoContainer>
        <DetailsSign>
          Fecha de inicio de recolección: <DetailsItem>Proximamente</DetailsItem>
        </DetailsSign>
      </InfoContainer>

      {/* <div style={{ paddingBottom: "32px" }}>
              <Calendar selected={formData.selectedDate} onChange={handleDateChange} />
            </div> */}
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="nameRecord">Nombre del registro</Label>
        <Input
          type="text"
          id="nameRecord"
          name="nameRecord"
          value={formData.nameRecord}
          onChange={handleChange}
          required
        />
        <Label htmlFor="eto">Evapotranspiración de referencia (ETo)</Label>
        <Input type="number" id="eto" name="eto" value={formData.eto} required disabled />
        <Label htmlFor="performance">Rendimiento diario (R)</Label>
        <Input
          type="number"
          id="performance"
          name="performance"
          value={formData.performance}
          onChange={handleChange}
          required
        />
        <Label htmlFor="currentGrowth">Etapa actual de crecimiento</Label>
        <Input
          type="text"
          id="currentGrowth"
          name="currentGrowth"
          value={`Frutificación (Kc = ${currentGrowth})`}
          disabled
        ></Input>
        <Label htmlFor="etc">Evapotranspiración real del cultivo (ETc)</Label>
        <Input type="number" id="etc" name="etc" value={formData.etc} disabled />
        <Label htmlFor="ar">Cant. aplicada de productos químicos - día (AR) </Label>
        <Description
          style={{ marginBottom: "-12px", marginTop: "0px" }}
          className="customDescription"
        >
          Selecciona el tipo de químico: Incluyendo fertilizantes, pesticidas, y otros aditivos
          (mg/L)
        </Description>
        <ProductSearch
          onProductSelect={(product) => console.log(product)}
          productsSelected={productsSelected}
          setProductsSelected={setProductsSelected}
        />
        <div>
          {productsSelected.map((product) => (
            <div key={product._id}>
              <span>
                {product.name} - {product.code} - {product.quantity} mg/L
              </span>
              <span> ~ </span>
            </div>
          ))}
        </div>
        <ButtonContainer>
          <Button type="submit" color="green">
            {recordId ? "Actualizar" : "Crear"}
          </Button>
          <Button type="button" color="red" onClick={onClose}>
            Cancelar
          </Button>
        </ButtonContainer>
      </Form>

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
