import React, { useState, useContext, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../context/ApiContext";
import { useNotification } from "../hooks/UseNotification";
import { NotificationModal } from "./modals/NotificationModal";
import { CollectionModal } from "./modals/CollectionModal";
import { fetchLotDetails } from "../services/lot_s";
import { updateCrop } from "../services/crop_s";
import { getCollectionByCropId } from "../services/collection_s";
import { NotificationI, NotificationDataInit } from "../interfaces/notification";
import { Crop } from "../interfaces/crop";
import { LotI } from "../interfaces/Lot";
import {
  FormWrapper,
  Form,
  FormField,
  Label,
  Input,
  ButtonContainer,
  Button,
} from "../styles/AddLoteStyles";
import { LastCollectionModal } from "./modals/LastCollectionModal";

interface FormData {
  cropName: string;
  area: Number;
  latitude: string;
  longitude: string;
}
interface Props {
  crop: Crop;
}

export const CropFormEdit: React.FC<Props> = ({ crop }) => {
  const navigate = useNavigate();
  const { closeNotification, notificationDetails, showNotification, triggerNotification } =
    useNotification();
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [showLastCollectionModal, setShowLastCollectionModal] = useState(false);
  const [cropStatus, setCropStatus] = useState(null);
  const [lastCollection, setLastCollection] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState("");
  // const [notificationDetails, setNotificationDetails] = useState({
  //   content: <></>,
  //   status: "",
  //   title: "",
  // });
  const { backendApiCall } = useContext(ApiContext);
  const [formData, setFormData] = useState({
    name: crop.name,
    area: crop.area,
    latitude: crop.latitude,
    longitude: crop.longitude,
  });

  const [lot, setLot] = useState<LotI>({
    _id: "",
    capacity: 0,
    name: "",
    available_capacity: 0,
    capacity_in_use: 0,
  });

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
    async function loadCropstatus() {
      try {
        const cropStatus = await getCollectionByCropId(backendApiCall, crop._id);
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
    loadCropstatus();
    console.log("CropStatus Mira: ", cropStatus);
  }, [backendApiCall, cropStatus]);

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

  const handleRegisterButton = () => {
    if (cropStatus === "in_progress") {
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

  console.log(crop);

  return (
    <>
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="cropName">Nombre del cultivo*</Label>
          <Input
            type="text"
            id="cropName"
            name="cropName"
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
      </FormWrapper>

      {showNotification && (
        <NotificationModal
          title={notificationDetails.title}
          description={notificationDetails.description}
          status={notificationDetails.status}
          buttonText="Aceptar"
          onClose={closeNotification}
        />
      )}
      {/* {showCollectionModal && (
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
      )} */}
    </>
  );
};
