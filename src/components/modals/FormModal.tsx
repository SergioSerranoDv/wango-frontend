import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { createNewRecords } from "../../services/record_s";
import { AppContext } from "../../context/AppContext";
import { ApiContext } from "../../context/ApiContext";
import { Calendar } from "../../components/modals/Calendar";
import { NotificationModal } from "../../components/modals/NotificationModal";
import {
  ButtonContainer,
  Button,
  Description,
  DetailsItem,
  DetailsSign,
  Form,
  InfoContainer,
  Input,
  Label,
  Select,
  Overlay,
  ModalContainer,
  SignBoard,
} from "../../styles/components/FormModalStyles";
import { NotificationDataInit, NotificationI } from "../../interfaces/notification";

interface AddRegistryProps {
  cropname: string;
  initialCollectionDate: Date;
  eto: number;
  currentGrowth: string;
  etc: number;
  selectedDate: Date;
  onClose: () => void;
}

export const AddRegistry: React.FC<AddRegistryProps> = ({
  cropname,
  initialCollectionDate,
  selectedDate,
  eto,
  currentGrowth,
  etc,
  onClose,
}) => {
  const { id } = useParams();
  const collectionId = id;
  const { userData } = useContext(AppContext);
  const { backendApiCall } = useContext(ApiContext);
  const [refetch, setRefetch] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(true);
  const [formData, setFormData] = useState({
    nameRecord: "",
    eto: eto,
    performance: "",
    currentGrowth: currentGrowth,
    etc: etc,
    ar: "",
    selectedDate: new Date(), // Estado para almacenar la fecha seleccionada
  });
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationDetails, setNotificationDetails] =
    useState<NotificationI>(NotificationDataInit);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date: Date) => {
    setFormData({
      ...formData,
      selectedDate: date, // Actualiza el estado con la nueva fecha seleccionada
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!collectionId) {
        handleNotification("Error", "No se ha encontrado el ID del cultivo", "error", "");
        return;
      }
      const response: any = await createNewRecords(backendApiCall, {
        amount_chemical_used: parseFloat(formData.ar),
        actual_crop_evapotranspiration: etc,
        collection_id: collectionId,
        current_stage: parseFloat(formData.currentGrowth),
        daily_performance: parseFloat(formData.performance),
        name: formData.nameRecord,
        reference_evapotranspiration: eto,
        user: userData.user,
      });
      if (response.status === "success") {
        setRefetch((prev) => prev + 1);
        setShowNotification(true);
        setNotificationDetails({
          title: "Estás cambiando un parámetro",
          description:
            "Si cambias la etapa de crecimiento en la que <br />  está el día, los registros de este también lo <br /> harán.",
          status: "error",
          redirectUrl: "",
        });
        return;
      }
      throw new Error("Server responded with status other than success.");
    } catch (error) {
      console.error(error);
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
    setIsVisible(false);
    onClose();
  };

  return (
    <>
      {isVisible && (
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
            <div style={{ paddingBottom: "32px" }}>
              <Calendar selected={selectedDate} onChange={handleDateChange} />
            </div>
            <Form>
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
              <Input
                type="text"
                id="eto"
                name="eto"
                value={eto}
                onChange={handleChange}
                required
                disabled
              />
              <Label htmlFor="performance">Rendimiento diario (R)</Label>
              <Input
                type="text"
                id="performance"
                name="performance"
                onChange={handleChange}
                required
              />
              <Label htmlFor="currentGrowth">Etapa actual de crecimiento</Label>
              <Input
                type="text"
                id="currentGrowth"
                name="currentGrowth"
                value={formData.currentGrowth}
                //onChange={handleChange}
                required
                disabled
              ></Input>

              <Label htmlFor="etc">Evapotranspiración real del cultivo (ETc)</Label>
              <Input
                type="number"
                id="etc"
                name="etc"
                value={etc}
                onChange={handleChange}
                required
                disabled
              />
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
                onChange={handleChange}
                value={formData.ar}
                required
              />
              <ButtonContainer>
                <Button type="submit" color="green" onClick={handleSubmit}>
                  Aceptar
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
      )}
    </>
  );
};
