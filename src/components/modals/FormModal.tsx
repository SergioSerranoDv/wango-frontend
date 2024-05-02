import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { ApiContext } from "../../context/ApiContext";
import { createNewRecords, updateRecord } from "../../services/record_s";
import { NotificationModal } from "../../components/modals/NotificationModal";
import {
  Overlay,
  ModalContainer,
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
    ar: number;
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
    ar: initialData?.ar || 0,
  });
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
      const recordData = {
        amount_chemicals_used: formData.ar,
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
        setNotificationDetails({
          title: "Registro exitoso",
          description: "Tu registro ha sido creado/actualizado correctamente.",
          status: "success",
          redirectUrl: "", // Puedes especificar una URL para redirigir si es necesario
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
      onClose(); // Cierra el modal de registro
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

  const handleNotification = (
    title: string,
    description: string,
    status: string,
    redirectUrl: string
  ) => {
    setNotificationDetails({ title, description, status, redirectUrl });
    setShowNotification(true);
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Overlay>
        <ModalContainer>
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
              Incluyendo fertilizantes, pesticidas, y otros aditivos.
            </Description>
            <Input
              type="number"
              id="ar"
              name="ar"
              value={formData.ar}
              onChange={handleChange}
              required
            />
            <ButtonContainer>
              <Button type="submit" color="green">
                {recordId ? "Actualizar" : "Crear"}
              </Button>
              <Button type="button" color="red" onClick={handleClose}>
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
        </ModalContainer>
      </Overlay>
    </>
  );
};
