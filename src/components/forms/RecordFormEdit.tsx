import React, { useState, useContext } from "react";
import { ApiContext } from "../../context/ApiContext";
import { AppContext } from "../../context/AppContext";
import { UseNotification } from "../../hooks/UseNotification";
import { Record } from "../../interfaces/record";
import { updateRecord } from "../../services/record_s";
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

interface RecordFormEditProps {
  collectionId: string;
  crop: {
    name: string;
    latitude: number;
    longitude: number;
  };
  record: Record;
  currentGrowth: number;
  onClose: () => void;
  setRefetch: React.Dispatch<React.SetStateAction<number>>;
}

export const RecordFormEdit: React.FC<RecordFormEditProps> = ({
  collectionId,
  crop,
  currentGrowth,
  record,
  onClose,
  setRefetch,
}) => {
  const { userData } = useContext(AppContext);
  const { backendApiCall } = useContext(ApiContext);
  const { closeNotification, showNotification, notificationDetails, triggerNotification } =
    UseNotification();
  const [formData, setFormData] = useState({
    nameRecord: record.name,
    eto: record.reference_evotranspiration,
    etc: record.actual_crop_evapotranspiration,
    performance: record.daily_performance,
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
      const updatedRecord = {
        _id: record._id,
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

      if (!record._id) {
        triggerNotification(
          "Error",
          "El registro no tiene un ID válido. Por favor, guarda el registro antes de editar.",
          "error",
          ""
        );
        return;
      }

      const response = await updateRecord(backendApiCall, updatedRecord, record._id);

      if (response.status === "success") {
        const title = "Registro actualizado";
        const description = "Has actualizado el registro exitosamente.";

        triggerNotification(title, description, "success", "");
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
          {record.chemicals_used.map((product, index) => (
            <div key={index}>
              <span>
                {product.product_id} - {product.amount} mg/L
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
