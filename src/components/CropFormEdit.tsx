import React, { useState, useContext, useEffect, ChangeEvent, FormEvent } from "react";
import { Lot } from "../interfaces/Lot";
import { Crop } from "../interfaces/crop";
import { useParams } from "react-router-dom";
import { fetchCropDetails, saveCrop } from "../services/crop_s";
import { ApiContext } from "../context/ApiContext";
import NotificationModal from "../components/modals/NotificationModal";
import checkLogo from "../assets/icons/checkLogo.svg";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
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
} from "../styles/FormStyles";
import { fetchLotDetails } from "../services/lot_s";

interface FormData {
  cropName: string;
  area: Number;
  latitude: string;
  longitude: string;
}
interface Props {
  cropId?: string;
}

function CropFormEdit({ cropId = "" }: Props) {
  const navigate = useNavigate();
  const [notificationMessage, setNotificationMessage] = useState("");
  const { backendApiCall } = useContext(ApiContext);
  const [formData, setFormData] = useState({
    cropName: "",
    area: 0,
    latitude: "",
    longitude: "",
  });
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [crop, setCrop] = useState<any>(null);
  const [lot, setLot] = useState<any>(null);
  console.log("CropId: ", cropId);

  useEffect(() => {
    async function loadCropDetails() {
      if (cropId) {
        try {
          const cropDetails = await fetchCropDetails(backendApiCall, cropId);
          if (cropDetails) {
            console.log("Crop details loaded: ", cropDetails);
            setCrop(cropDetails);
            setFormData((prevData) => ({
              ...prevData,
              cropName: cropDetails.name,
              area: cropDetails.area, // Asegúrate de que 'area' tenga el valor correcto
              latitude: cropDetails.latitude, // Asegúrate de que 'latitude' tenga el valor correcto
              longitude: cropDetails.longitude, //
            }));
          }
        } catch (error) {
          console.log("Error fetching crop details:", error);
        }
      }
    }
    loadCropDetails();
    console.log("Crop2 ", crop);
  }, [backendApiCall, cropId]);

  useEffect(() => {
    async function loadLotDetails() {
      if (crop) {
        try {
          const lotDetails = await fetchLotDetails(backendApiCall, crop.lot_id);
          if (lotDetails) {
            console.log("Lot details loaded: ", lotDetails);
            setLot(lotDetails);
          }
        } catch (error) {
          console.log("Error fetching lot details:", error);
        }
      }
    }
    loadLotDetails();
  }, [backendApiCall, crop]);

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
      const response = await saveCrop(
        backendApiCall,
        {
          _id: cropId,
          name: formData.cropName,
          area: formData.area,
          lot_id: lot.lot_id, // Assuming 'lot' is the state variable holding the lot details
          latitude: formData.latitude,
          longitude: formData.longitude,
        },
        cropId
      );
      if (response.status === "error") {
        setNotificationMessage("Hubo un error editando el cultivo");
      } else {
        setNotificationMessage("Cambios guardados exitosamente");
      }
      setShowNotification(true);
      // Oculta el mensaje después de 3 segundos
      setTimeout(() => {
        setShowNotification(false);
        navigate(`/lot-menu/crops/${crop.lot_id}`);
      }, 1500);
    } catch (error) {
      console.error("Error updating crop:", error);
      setNotificationMessage("Hubo un error editando el cultivo");
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  return (
    <div>
      <Navbar />
      <FormContainer>
        <SignBoard>Información del cultivo</SignBoard>
        {showNotification && <SignBoard2 $custom1>{notificationMessage}</SignBoard2>}

        <InfoContainer>
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
        </InfoContainer>
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
            //onChange={handleChange}
            disabled
          />

          <Label htmlFor="latitude">Latitud (°)*</Label>
          <Input type="number" id="latitude" name="latitude" value={crop?.latitude} disabled />

          <Label htmlFor="longitude">Longitud (°)*</Label>
          <Input
            type="number"
            id="longitude"
            name="longitude"
            value={formData.longitude}
            //onChange={handleChange}
            disabled
          />

          <ButtonContainer2>
            <Button $custom1>Registros</Button>
            <Button type="submit" color="green" $custom1>
              Guardar cambios
            </Button>
          </ButtonContainer2>
        </Form>
      </FormContainer>
      {/*{showNotification && (
        <NotificationModal
          title="Cultivo añadido exitosamente"
          description="¡Excelente! Podrás ver tu nuevo cultivo en la sección de <br />  ‘Ver cultivos del lote’."
          imageUrl={checkLogo}
          buttonText="Aceptar"
          //onClose={handleNotificationClose}
          redirectUrl={`/lot-menu/crops/${lotId}`}
        />
      )}*/}
    </div>
  );
}

export default CropFormEdit;
