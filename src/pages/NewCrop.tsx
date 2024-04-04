import React, { useState, useContext, useEffect } from "react";
import { Lot } from "../interfaces/Lot";
import { useParams } from "react-router-dom";
import { fetchLotDetails } from "../services/lot_s";
import { ApiContext } from "../context/ApiContext";
import Navbar from "../components/Navbar";
import {
  Button,
  Description,
  DetailsItem,
  DetailsSign,
  Form,
  InfoContainer,
  Input,
  Label,
  FormContainer,
  SignBoard,
} from "../styles/FormStyles";

import { createNewCrop } from "../services/crop_s";

export default function NewCrop() {
  const { id } = useParams();
  const lotId = id;
  const { backendApiCall } = useContext(ApiContext);
  const [refetch, setRefetch] = useState<number>(0);
  const [lotData, setLotData] = useState({} as Lot);
  const [formData, setFormData] = useState({
    cropName: "",
    area: "",
    latitude: "",
    longitude: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!lotId) {
        throw new Error("No se ha encontrado el ID del lote");
      }
      if (lotData.available_capacity === 0) {
        alert("El lote no tiene capacidad disponible");
        return;
      }
      if (parseInt(formData.area) > lotData.available_capacity) {
        console.log("Area:", formData.area);
        alert("El área debe ser menor o igual a la capacidad disponible");
        return;
      }
      if (parseInt(formData.area) <= 0) {
        alert("El área debe ser mayor a 0");
        return;
      }
      const response: any = await createNewCrop(backendApiCall, {
        area: parseInt(formData.area),
        lot_id: lotId,
        name: formData.cropName,
        latitude: formData.latitude,
        longitude: formData.longitude,
      });
      if (response.status === "success") {
        alert("Cultivo añadido correctamente");
        setFormData({
          cropName: "",
          area: "",
          latitude: "",
          longitude: "",
        });
        setRefetch((prev) => prev + 1);
        return;
      }
      alert(response.message);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const lot = await fetchLotDetails(backendApiCall, lotId as string);
      if (lot) {
        setLotData(lot);
      }
    };
    fetchData();
  }, [backendApiCall, lotId, refetch]);

  return (
    <div>
      <Navbar />
      <FormContainer>
        <SignBoard $custom1>Agrega un nuevo cultivo al lote ‘MisPruebas01’</SignBoard>
        <InfoContainer>
          <DetailsSign>
            ID lote: <DetailsItem>{lotData._id}</DetailsItem>
          </DetailsSign>
          <DetailsSign>
            Área disponible: <DetailsItem>{lotData.available_capacity}</DetailsItem>
          </DetailsSign>
          <DetailsSign>
            Área en ocupación: <DetailsItem>{lotData.capacity_in_use}</DetailsItem>
          </DetailsSign>
        </InfoContainer>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="cropName">Nombre del cultivo</Label>
          <Input
            type="text"
            id="cropName"
            name="cropName"
            value={formData.cropName}
            onChange={handleChange}
            required
          />

          <Label htmlFor="area">Área</Label>
          <Input
            type="number"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
          />

          <Label htmlFor="latitude">Latitud</Label>
          <Input
            type="number"
            id="latitude"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            required
          />

          <Label htmlFor="longitude">Longitud</Label>
          <Input
            type="number"
            id="longitude"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
          />
          <Button type="submit" $custom1>
            Añadir cultivo
          </Button>

          <Description $custom1>
            Podrás añadir un encargado a este cultivo en la sección de ‘Mis cultivos’ en el menú
            principal.
          </Description>
        </Form>
      </FormContainer>
    </div>
  );
}
