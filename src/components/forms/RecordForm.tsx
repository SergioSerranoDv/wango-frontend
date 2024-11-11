import React, { useState, useContext, useEffect } from "react";
import { ApiContext } from "../../context/ApiContext";
import { AppContext } from "../../context/AppContext";
import { UseNotification } from "../../hooks/UseNotification";
import { createNewRecords } from "../../services/record_s";
import { calculateEt0andETc } from "../../services/weather_s";
import {
  SignBoard,
  InfoContainer,
  DetailsSign,
  Form,
  Input,
  Label,
  Description,
  DetailsItem,
} from "../../styles/components/FormModalStyles";
import { ProductSearch } from "../ProductSearch";
import { NotificationModal } from "../modals/NotificationModal";

interface AddRegistryProps {
  collectionId: string;
  crop: {
    name: string;
    latitude: number;
    longitude: number;
  };
  currentGrowth: number;
  onClose: () => void;
  setRefetch: React.Dispatch<React.SetStateAction<number>>;
}

export const RecordForm: React.FC<AddRegistryProps> = ({
  collectionId,
  crop,
  currentGrowth,
  onClose,
  setRefetch,
}) => {
  const { userData } = useContext(AppContext);
  const { backendApiCall } = useContext(ApiContext);
  const { closeNotification, showNotification, notificationDetails, triggerNotification } =
    UseNotification();
  const [formData, setFormData] = useState({
    nameRecord: "",
    eto: 0,
    etc: 0,
    performance: 0,
  });
  const [productsSelected, setProductsSelected] = useState<any[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const record = {
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

      const response = await createNewRecords(backendApiCall, record);

      if (response.status === "success") {
        const title = "Registro creado";
        const description = "Has creado un registro, podrás hacer otro en 24 horas.";

        triggerNotification(title, description, "success", "");
      } else if (
        response.status === "error" &&
        response.message === "You can only create a record once a day"
      ) {
        // Si el usuario ya ha creado un registro hoy, muestra una notificación de error
        triggerNotification(
          "Error",
          "Ya has creado un registro hoy. Por favor, intenta de nuevo mañana.",
          "error",
          ""
        );
      } else {
        triggerNotification("Error", response.message || "Ha ocurrido un error.", "error", "");
      }
      setRefetch((prev) => prev + 1);
    } catch (error) {
      triggerNotification(
        "Error",
        "Ha ocurrido un error inesperado. Por favor, intenta mas tarde",
        "error",
        ""
      );
    }
  };

  const handleNotificationClose = () => {
    closeNotification();
    onClose();
  };

  useEffect(() => {
    async function fetchEvotranspirationDataFromOpenMeteo() {
      try {
        const { eto, etc } = await calculateEt0andETc(crop.latitude, crop.longitude);
        setFormData((prev) => ({ ...prev, eto: parseFloat(eto), etc: parseFloat(etc) }));
      } catch (error) {
        triggerNotification(
          "Error",
          "No se pudo obtener la información de evapotranspiración. Por favor, intenta de nuevo.",
          "error",
          ""
        );
      }
    }
    fetchEvotranspirationDataFromOpenMeteo();
  }, []);

  return (
    <>
      <SignBoard $custom2>
        Haz tu registro diario para el cultivo <DetailsItem>{crop.name}</DetailsItem>
      </SignBoard>

      <InfoContainer>
        <DetailsSign>
          Fecha de inicio de recolección: <DetailsItem>Proximamente</DetailsItem>
        </DetailsSign>
      </InfoContainer>

      <Form id="record-form" onSubmit={handleSubmit}>
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
