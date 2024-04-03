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
import React, { useState } from "react";

export default function NewCrop() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
  };

  return (
    <div>
      <Navbar />
      <FormContainer>
        <SignBoard $custom1>Agrega un nuevo cultivo al lote ‘MisPruebas01’</SignBoard>
        <InfoContainer>
          <DetailsSign>
            ID lote: <DetailsItem>24 Example</DetailsItem>
          </DetailsSign>
          <DetailsSign>
            Área disponible: <DetailsItem>2,7 Example Ha</DetailsItem>
          </DetailsSign>
          <DetailsSign>
            Área en ocupación: <DetailsItem>17,3 Example Ha</DetailsItem>
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
