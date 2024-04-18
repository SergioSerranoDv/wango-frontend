import React, { useState } from "react";
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
  name: string;
  available_capacity: string;
  capacity_in_use: string;
  cropname: string;
  eto: string;
  currentGrowth: string;
  etc: string;
  ar: string;
  selectedDate: Date;
  onClose: () => void;
}

export const AddRegistry: React.FC<AddRegistryProps> = ({
  name,
  available_capacity,
  capacity_in_use,
  selectedDate,
  cropname,
  eto,
  currentGrowth,
  etc,
  ar,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [formData, setFormData] = useState({
    cropName: "",
    area: "",
    latitude: "",
    longitude: "",
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

  const handleSubmit = async (e: React.FormEvent) => {};

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
              Haz tu registro diario para el cultivo ‘Manguito01’ <DetailsItem>{name}</DetailsItem>
            </SignBoard>
            <InfoContainer>
              <DetailsSign>
                Nombre del lote: <DetailsItem>{available_capacity}</DetailsItem>
              </DetailsSign>
              <DetailsSign>
                Fecha de inicio de recolección: <DetailsItem>{capacity_in_use}</DetailsItem>
              </DetailsSign>
            </InfoContainer>
            <div style={{ paddingBottom: "32px" }}>
              <Calendar selected={selectedDate} onChange={handleDateChange} />
            </div>
            <Form onSubmit={handleSubmit}>
              <Label htmlFor="cropname">Nombre del cultivo</Label>
              <Input
                type="text"
                id="cropname"
                name="cropname"
                //value={formData.cropname}
                onChange={handleChange}
                required
                disabled
              />
              <Label htmlFor="eto">Evapotranspiración de referencia (ETo)</Label>
              <Input
                type="text"
                id="eto"
                name="eto"
                //value={formData.eto}
                onChange={handleChange}
                required
                disabled
              />
              <Label htmlFor="performance">Rendimiento diario (R)</Label>
              <Input
                type="text"
                id="performance"
                name="performance"
                //value={formData.eto}
                onChange={handleChange}
                required
                disabled
              />
              <Label htmlFor="currentGrowth">Etapa actual de crecimiento</Label>
              <Select
                id="currentGrowth"
                name="currentGrowth"
                //value={formData.currentGrowth}
                //onChange={handleChange}
                required
                disabled
              >
                <option value="1.75">Frutificación (Kc = 1.75)</option>{" "}
                {/* Está por default, pero el orden correcto es como está abajo */}
                <option value="0.9">Crecimiento vegetativo (Kc = 0.9)</option>
                <option value="1.35">Floración (Kc = 1.35)</option>
                <option value="1.75">Frutificación (Kc = 1.75)</option>
                <option value="1.5">Promedio (Kc = 1.5)</option>
              </Select>

              <Label htmlFor="etc">Evapotranspiración real del cultivo (ETc)</Label>
              <Input
                type="number"
                id="etc"
                name="etc"
                //value={formData.etc}
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
                type="text"
                id="ar"
                name="ar"
                //value={formData.ar}
                onChange={handleChange}
                required
                disabled
              />
              <ButtonContainer>
                <Button type="submit" color="green">
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
