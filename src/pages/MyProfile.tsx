import React, { useContext, useState, useEffect } from "react";
import NotificationModal from "../components/modals/NotificationModal";
import checkLogo from "../assets/icons/checkLogo.svg";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ApiContext } from "../context/ApiContext";
import Navbar from "../components/Navbar";

import {
  ButtonContainer,
  Button,
  Form,
  FormField,
  Input,
  Label,
  FormContainer,
  Select,
  SignBoard,
  DivIdentification,
} from "../styles/FormStyles";

const MyProfile: React.FC = () => {
  const { backendApiCall } = useContext(ApiContext);
  const { userData } = useContext(AppContext);
  const [editedData, setEditedData] = useState(userData);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    setEditedData(userData);
  }, [userData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Formulario enviado:", editedData);

    const response = await backendApiCall({
      method: "PUT",
      endpoint: "v1/user/info/update",
      body: editedData,
    });
    if (response.status === "error") {
      console.error(response.message);
      return;
    }
    setShowNotification(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  return (
    <>
      <Navbar />
      <FormContainer>
        <SignBoard $custom2>Información de usuario</SignBoard>
        <Form onSubmit={handleSubmit}>
          <DivIdentification>
            <FormField style={{ width: "25%" }}>
              <Label $primary htmlFor="typeID">
                Tipo*
              </Label>
              <Select
                id="identificationType"
                name="id_type"
                required
                value={editedData.id_type}
                onChange={handleChange}
              >
                <option value="">--</option>
                <option value="C.C">C.C</option>
                <option value="C.E">C.E</option>
                <option value="T.I">T.I</option>
              </Select>
            </FormField>

            <FormField style={{ width: "75%" }}>
              <Label $primary htmlFor="identification">
                Identificación*
              </Label>
              <Input
                $custom
                id="identification"
                type="text"
                name="id_number"
                required
                value={editedData.id_number}
                onChange={handleChange}
                min={10000000}
                max={1999999999}
              />
            </FormField>
          </DivIdentification>
          <FormField>
            <Label htmlFor="name">Nombre*</Label>
            <Input
              $custom
              id="name"
              type="text"
              name="name"
              required
              value={editedData.name}
              onChange={handleChange}
            />
          </FormField>
          <FormField>
            <Label htmlFor="lastName">Apellidos*</Label>
            <Input
              $custom
              id="lastName"
              type="text"
              name="last_name"
              required
              value={editedData.last_name}
              onChange={handleChange}
            />
          </FormField>
          <FormField>
            <Label htmlFor="email">Correo*</Label>
            <Input
              id="email"
              type="email"
              name="email"
              required
              defaultValue={editedData.email}
              onChange={handleChange}
              disabled
            />
          </FormField>
          <FormField>
            <Label htmlFor="userType">Tipo de usuario*</Label>
            <Input
              id="userType"
              type="text"
              name="user_type"
              required
              defaultValue="Administrador"
              onChange={handleChange}
              disabled
            />
          </FormField>
          <ButtonContainer>
            <Button type="submit" color="green">
              Guardar
            </Button>
            <Button type="button" color="red">
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Cancelar
              </Link>
            </Button>
          </ButtonContainer>
        </Form>
        {showNotification && (
          <NotificationModal
            title="Cambios guardados"
            description="¡Cambios guardados correctamente!"
            imageUrl={checkLogo}
            buttonText="Aceptar"
            onClose={handleNotificationClose}
            redirectUrl="/"
          />
        )}
      </FormContainer>
    </>
  );
};

export default MyProfile;
