import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NotificationModal } from "../components/modals/NotificationModal";
import { ApiContext } from "../context/ApiContext";
import { AppContext } from "../context/AppContext";
import { MainLayout } from "../layouts/MainLayout";
import {
  ButtonContainer,
  Button,
  Form,
  FormField,
  Input,
  Label,
  SignBoard,
  DivIdentification,
} from "../styles/FormStyles";
import { SubContainer } from "../styles/GlobalStyles";

export const Profile: React.FC = () => {
  const { backendApiCall } = useContext(ApiContext);
  const { userData, setRefetchData } = useContext(AppContext);
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
      endpoint: "user/info/update",
      body: editedData,
    });
    if (response.status === "error") {
      console.error(response.message);
      return;
    }
    setShowNotification(true);
    setRefetchData((prevData) => prevData + 1);
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
    <MainLayout>
      <SubContainer>
        <SignBoard $custom2>Información de usuario</SignBoard>
        <Form onSubmit={handleSubmit}>
          <DivIdentification>
            <FormField style={{ width: "25%" }}>
              <Label $primary htmlFor="typeID">
                Tipo*
              </Label>
              <Input
                id="identificationType"
                name="id_type"
                required
                value={editedData.id_type}
                onChange={handleChange}
                disabled
              ></Input>
            </FormField>

            <FormField style={{ width: "75%" }}>
              <Label $primary htmlFor="identification">
                Identificación*
              </Label>
              <Input
                id="identification"
                type="text"
                name="id_number"
                required
                value={editedData.id_number}
                onChange={handleChange}
                disabled
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
            status={"success"}
            buttonText="Aceptar"
            onClose={handleNotificationClose}
            redirectUrl="/"
          />
        )}
      </SubContainer>
    </MainLayout>
  );
};
