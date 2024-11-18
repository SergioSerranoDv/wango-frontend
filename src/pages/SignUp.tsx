import React, { useState, useContext, useEffect } from "react";
import logo from "../assets/images/logo.svg";
import { ApiContext } from "../context/ApiContext";
import { AppContext } from "../context/AppContext";
import {
  Button,
  Form,
  FormField,
  FormContent,
  Input,
  Label,
  Logo,
  Select,
  SignBoard,
  FormContainer,
} from "../styles/FormStyles";
import { DivIdentification } from "../styles/FormStyles";
import { Container } from "../styles/GlobalStyles";

export const SignUp: React.FC = () => {
  const { backendApiCall } = useContext(ApiContext);
  const { setRefetchData } = useContext(AppContext);
  const [emailNewUser, setEmailNewUser] = useState("");
  const [formData, setFormData] = useState({
    typeID: "",
    identification: "",
    userName: "",
    lastName: "",
    email: "",
    userType: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { typeID, identification, userName, lastName, password } = formData;

    const response = await backendApiCall({
      method: "PUT",
      endpoint: "user/info/update",
      body: {
        name: userName,
        last_name: lastName,
        id_number: identification,
        id_type: typeID,
        security: {
          identity_verified: true,
          password: password,
        },
      },
    });

    if (response.status === "error") {
      console.error(response.message);
      return;
    }
    setRefetchData((prev) => prev + 1);
  };

  useEffect(() => {
    const getUserData = async () => {
      const userData = await backendApiCall({ method: "GET", endpoint: "user/info" });
      if (userData.data) {
        setEmailNewUser(userData.data.email);
      }
    };
    getUserData();
  }, [backendApiCall]);

  return (
    <Container>
      <FormContainer>
        <Logo src={logo} alt="Wango" />
        <SignBoard $custom2>¡Escribe tu información para registrarte!</SignBoard>
        <Form onSubmit={handleSubmit}>
          <FormContent>
            <FormField>
              <Label htmlFor="userName">Nombres*</Label>
              <Input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
              />
            </FormField>

            <DivIdentification>
              <FormField style={{ width: "25%" }}>
                <Label $primary htmlFor="typeID">
                  Tipo*
                </Label>
                <Select
                  id="typeID"
                  name="typeID"
                  value={formData.typeID}
                  onChange={handleChange}
                  required
                >
                  <option value="">--</option>
                  <option value="C.C">C.C</option>
                  <option value="C.E">C.E</option>
                  <option value="T.I">T.I</option>
                </Select>
              </FormField>

              <FormField style={{ width: "75%" }}>
                <Label htmlFor="identification">Identificación*</Label>
                <Input
                  $custom
                  type="number"
                  id="identification"
                  name="identification"
                  value={formData.identification}
                  onChange={handleChange}
                  min={10000000}
                  max={1999999999}
                />
              </FormField>
            </DivIdentification>

            <FormField>
              <Label htmlFor="lastName">Apellidos*</Label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </FormField>

            <FormField>
              <Label htmlFor="email">Correo*</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={emailNewUser}
                onChange={handleChange}
                disabled
              />
            </FormField>

            <FormField>
              <Label htmlFor="userType">Tipo de usuario*</Label>
              <Select id="userType" name="userType" value="Admin" onChange={handleChange} disabled>
                <option value="Admin">Administrador</option>
              </Select>
            </FormField>

            <Button type="submit">Continuar</Button>
          </FormContent>
        </Form>
      </FormContainer>
    </Container>
  );
};
