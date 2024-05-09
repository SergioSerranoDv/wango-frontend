import React, { useState, useContext, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../context/ApiContext";
import { NotificationModal } from "./modals/NotificationModal";
import { CollectionModal } from "./modals/CollectionModal";
import { fetchLotDetails } from "../services/lot_s";
import { fetchCropDetails, updateCrop } from "../services/crop_s";
import { getCollectionByCropId } from "../services/collection_s";
import { NotificationI, NotificationDataInit } from "../interfaces/notification";
import { Crop } from "../interfaces/crop";
import { LotI } from "../interfaces/Lot";
import { LastCollectionModal } from "./modals/LastCollectionModal";
import {
  Button,
  DetailsItem,
  DetailsSign,
  Form,
  InfoContainer,
  Input,
  Label,
  FormContainer,
  SignBoard,
  ButtonContainer2,
  SignBoard2,
  InfoContainer2,
} from "../styles/FormStyles";

interface FormData {
  cropName: string;
  area: Number;
  latitude: string;
  longitude: string;
}
interface CropFormEditProps {
  cropId?: string;
}

export const CropFormEdit: React.FC<CropFormEditProps> = ({ cropId = "" }) => {
  const navigate = useNavigate();
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [showLastCollectionModal, setShowLastCollectionModal] = useState(false);
  const [cropStatus, setCropStatus] = useState(null);
  const [lastCollection, setLastCollection] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationDetails, setNotificationDetails] = useState({
    content: <></>,
    status: "",
    title: "",
  });
  const { backendApiCall } = useContext(ApiContext);
  const [formData, setFormData] = useState({
    cropName: "",
    area: 0,
    latitude: "",
    longitude: "",
  });
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [crop, setCrop] = useState<Crop>({
    _id: "",
    area: 0,
    lot_id: "",
    name: "",
    latitude: "",
    longitude: "",
  });
  const [lot, setLot] = useState<LotI>({
    _id: "",
    capacity: 0,
    name: "",
    available_capacity: 0,
    capacity_in_use: 0,
  });
  // Fetch crop details when the component mounts
  useEffect(() => {
    async function loadCropDetails() {
      if (cropId) {
        try {
          const cropDetails = await fetchCropDetails(backendApiCall, cropId);
          if (cropDetails && cropDetails.data) {
            setCrop(cropDetails.data);
            setFormData((prevData) => ({
              ...prevData,
              cropName: cropDetails.data.name,
              area: cropDetails.data.area,
              latitude: cropDetails.data.latitude,
              longitude: cropDetails.data.longitude,
            }));
          }
        } catch (error) {
          console.log("Error fetching crop details:", error);
        }
      }
    }
    loadCropDetails();
  }, [backendApiCall, cropId]);
  // Fetch lot details when the component mounts
  useEffect(() => {
    async function loadLotDetails() {
      if (crop) {
        try {
          const response = await fetchLotDetails(backendApiCall, crop.lot_id);
          if (response.status === "success" && response.data) {
            setLot(response.data);
          }
        } catch (error) {
          console.log("Error fetching lot details:", error);
        }
      }
    }
    loadLotDetails();
  }, [backendApiCall, crop]);
  //load crop status
  useEffect(() => {
    console.log("CropId: ", cropId);
    async function loadCropstatus() {
      if (cropId) {
        try {
          const cropStatus = await getCollectionByCropId(backendApiCall, cropId);
          setCropStatus(cropStatus.data.status);
          if (cropStatus) {
            //console.log("Estado del crop: ", cropStatus.data.status);
            setCropStatus(cropStatus.data.status);
            setLastCollection(cropStatus.data);
          }
        } catch (error) {
          console.log("Error getting crop status:", error);
        }
      }
    }
    loadCropstatus();
    console.log("CropStatus Mira: ", cropStatus);
  }, [backendApiCall, cropId, cropStatus]);

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
      if (!lot._id) {
        return;
      }
      const response = await updateCrop(
        backendApiCall,
        {
          _id: cropId,
          name: formData.cropName,
          area: formData.area,
          lot_id: lot._id,
          latitude: formData.latitude,
          longitude: formData.longitude,
        },
        cropId
      );
      if (response.status === "error") {
        setNotificationMessage("Hubo un error editando el cultivo");
      } else {
        setNotificationMessage("Cultivo editado exitosamente");
      }
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        navigate(`/lot-menu/crops/${crop.lot_id}`);
      }, 4000);
    } catch (error) {
      console.error("Error updating crop:", error);
      setNotificationMessage("Hubo un error editando el cultivo");
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 4000);
    }
  };
  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  const handleRegisterButton = () => {
    if (cropStatus == "in_progress") {
      // console.log("Efectivamente está en progreso");
      // console.log("CropId: ", cropId);
      if (lastCollection) {
        console.log("Latest collection: ", lastCollection);
        setShowLastCollectionModal(true);
      }
    } else {
      setShowCollectionModal(true);
    }
  };

  return (
    <>
      <FormContainer>
        <SignBoard>Información del cultivo</SignBoard>
        {showNotification && <SignBoard2 $custom1>{notificationMessage}</SignBoard2>}
        <InfoContainer2 $custom1>
          <br />
          <DetailsSign $custom3>
            Lote: <DetailsItem> {lot?.name}</DetailsItem>
          </DetailsSign>
          <DetailsSign $custom3>
            Área disponible: <DetailsItem> {lot?.available_capacity} Ha</DetailsItem>
          </DetailsSign>
          <DetailsSign $custom3>
            Área en ocupación: <DetailsItem>{lot?.capacity_in_use} Ha</DetailsItem>
          </DetailsSign>
        </InfoContainer2>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="cropName">Nombre del cultivo*</Label>
          <Input
            type="text"
            id="cropName"
            name="cropName"
            value={formData.cropName} // Asegúrate de que el valor esté vinculado a formData.cropName
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
            value={crop?.latitude}
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
          <ButtonContainer2>
            <Button type="button" $custom1 onClick={handleRegisterButton}>
              Registros
            </Button>
            <Button type="submit" color="green" $custom1>
              Guardar cambios
            </Button>
          </ButtonContainer2>
        </Form>
      </FormContainer>
      {showNotification && (
        <NotificationModal
          title={"Cultivo editado exitosamente Modal"}
          description="¡Excelente! Podrás ver tu nuevo cultivo en la sección de <br />  ‘Ver cultivos del lote’."
          status="success"
          buttonText="Aceptar"
          onClose={handleNotificationClose}
          redirectUrl={`/lot-menu/crops/${cropId}`}
        />
      )}
      {showCollectionModal && (
        <CollectionModal
          data={{
            crop_id: cropId,
          }}
          status="success"
          title="Deseas realizar una nueva recolección?"
          description="¡Excelente! Podrás ver tu nuevo cultivo en la sección de <br />  ‘Ver cultivos del lote’."
          buttonText="Aceptar"
          onClose={() => setShowCollectionModal(false)}
        />
      )}
      {showLastCollectionModal && (
        <LastCollectionModal
          data={{
            crop_id: cropId,
          }}
          title="Cultivo en estado de recolección "
          description="¡Hey! Ya es†ás en estado de recolección justo ahora.  <br />  ¿Quieres ver echar un vistazo?"
          status="success"
          buttonText="Registros"
          onClose={() => setShowLastCollectionModal(false)}
        />
      )}
    </>
  );
};
