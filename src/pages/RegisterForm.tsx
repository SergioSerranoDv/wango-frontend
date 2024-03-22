import React, { useState } from "react";
import {
  Button,
  Description,
  Form,
  FormField,
  Input,
  Label,
  Link,
  Logo,
  RegisterFormContainer,
  Select,
  SignBoard,
} from "../styles/FormStyles";
import logo from "../assets/images/logo.svg";
import { DivIdentification } from "../styles/FormStyles";
const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    typeID: "",
    identification: "",
    userName: "",
    lastName: "",
    email: "",
    userType: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
  };

  return (
    <RegisterFormContainer>
      <Logo src={logo} alt="Logo" />
      <SignBoard>¡Escribe tu información para registrarte!</SignBoard>
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
              onChange={(e) => setFormData({ ...formData, typeID: e.target.value })}
              required
            >
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
          value={formData.email}
          onChange={handleChange}
        />

        <Label htmlFor="userType">Tipo de usuario*</Label>
        <Select
          $primary
          id="userType"
          name="userType"
          value={formData.userType}
          disabled /*onChange={handleChange}*/
        >
          <option value="C.C">Administrador</option>
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
          onChange={handleChange}
        />

        <Button type="submit">Continuar</Button>
      </Form>
      <SignBoard $primary>
        ¿Ya tienes una cuenta? <Link $primary>¡Ingresa usándola!</Link>
      </SignBoard>
    </RegisterFormContainer>
  );
};

export default RegisterForm;
