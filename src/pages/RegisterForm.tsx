import React, { useState, useContext } from "react";
import {
  Button,
  Description,
  Form,
  FormField,
  Input,
  Label,
  Logo,
  FormContainer,
  Select,
  SignBoard,
} from "../styles/FormStyles";
import logo from "../assets/images/logo.svg";
import { ApiContext } from "../context/ApiContext";
import { AppContext } from "../context/AppContext";
import { DivIdentification } from "../styles/FormStyles";

interface RegisterFormProps {
  user?: {
    email: string;
  };
}
const RegisterForm: React.FC<RegisterFormProps> = ({ user }) => {
  console.log("User:", user);
  const { backendApiCall } = useContext(ApiContext);
  const { setRefetchData, userData } = useContext(AppContext);
  const [formData, setFormData] = useState({
    typeID: "",
    identification: "",
    userName: "",
    lastName: "",
    email: "",
    userType: "",
    password: "",
  });

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "email") {
      const isValidEmail = validateEmail(value);
      setIsValidEmail(isValidEmail);
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    // Obtener los datos de los inputs
    const { typeID, identification, userName, lastName, password } = formData;

    if (validatePassword(password)) {
      setIsValidPassword(true);
      // Upate user data in the backend
      const response = await backendApiCall({
        method: "PUT",
        endpoint: "v1/user/info/update",
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
    } else {
      setIsValidPassword(false);
    }
  };

  const validatePassword = (password: string): boolean => {
    //Comprobar la longitud de los caracteres
    if (password.length < 12) {
      return false;
    }

    //Comprobar su cuenta con los caracteres exigidos
    //Mayúsculas
    const uppercaseRegex = /[A-Z]/;
    //Minúsculas
    const lowercaseRegex = /[a-z]/;
    //Los caracteres especiales
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (
      !uppercaseRegex.test(password) ||
      !lowercaseRegex.test(password) ||
      !specialCharRegex.test(password)
    ) {
      return false;
    }

    return true;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const isValid = validatePassword(value);
    setIsValidPassword(isValid);
    console.log("Contraseña válida:", isValid);
  };
  console.log("Email:", userData.email);
  return (
    <FormContainer>
      <Logo src={logo} alt="Logo" />
      <SignBoard $custom2>¡Escribe tu información para registrarte!</SignBoard>
      {!isValidPassword && (
        <SignBoard $custom>Tu contraseña no cumple con los requisitos</SignBoard>
      )}
      {!isValidEmail && <SignBoard $custom>Correo electrónico inválido</SignBoard>}
      <Form onSubmit={handleSubmit}>
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

        <Label htmlFor="userName">Nombres*</Label>
        <Input
          type="text"
          id="userName"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
        />

        <Label htmlFor="lastName">Apellidos*</Label>
        <Input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <Label htmlFor="email">Correo*</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          disabled
        />

        <Label htmlFor="userType">Tipo de usuario*</Label>
        <Select id="userType" name="userType" value="Admin" onChange={handleChange} disabled>
          <option value="Admin">Administrador</option>
        </Select>

        <Label htmlFor="password" $primary>
          Contraseña*
        </Label>

        <Description>
          Tu password debe tener más de 12 caractéres, al menos 1 letra mayúscula, 1 letra
          minúscula, y 1 caracter especial.
        </Description>
        <Input
          $primary
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handlePasswordChange}
        />

        {isValidPassword && (
          <Button type="submit" $primary>
            Continuar
          </Button>
        )}
      </Form>
    </FormContainer>
  );
};

export default RegisterForm;
