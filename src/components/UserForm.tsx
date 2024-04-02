import React, { useContext, useState, useEffect } from "react";
import NotificationModal from "./modals/NotificationModal";
import checkLogo from "../assets/icons/checkLogo.svg";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ApiContext } from "../context/ApiContext";

import {
  FormWrapper,
  Form,
  FormHeader,
  FormField,
  Label,
  Dropdown,
  DropdownItem,
  IdInput,
  Input,
  ButtonContainer,
  Button,
} from "../styles/UserFormStyles";

const UserForm: React.FC = () => {
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
    <FormWrapper>
      <FormHeader>Información de usuario</FormHeader>
      <Form onSubmit={handleSubmit}>
        <div style={{ display: "flex", width: "100%", gap: "1em" }}>
          <FormField style={{ width: "20%" }}>
            <Label htmlFor="identificationType">Tipo*</Label>
            <Dropdown
              style={{ width: "100%" }}
              id="identificationType"
              name="id_type"
              required
              value={editedData.id_type}
              onChange={handleChange}
            >
              <DropdownItem value="CC">CC</DropdownItem>
              <DropdownItem value="CE">CE</DropdownItem>
            </Dropdown>
          </FormField>
          <FormField style={{ width: "80%" }}>
            <Label htmlFor="identification">Identificación*</Label>
            <IdInput
              style={{ width: "100%" }}
              id="identification"
              type="text"
              name="id_number"
              required
              value={editedData.id_number}
              onChange={handleChange}
            />
          </FormField>
        </div>
        <FormField>
          <Label htmlFor="name">Nombre*</Label>
          <Input
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
          <Button type="button">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Cancelar
            </Link>
          </Button>
          <Button type="submit">Guardar cambios</Button>
        </ButtonContainer>
      </Form>
      {showNotification && (
        <NotificationModal
          title="Cambios guardados"
          description="¡Cambios guardados correctamente!."
          imageUrl={checkLogo}
          buttonText="Aceptar"
          onClose={handleNotificationClose}
          redirectUrl="/"
        />
      )}
    </FormWrapper>
  );
};

export default UserForm;
