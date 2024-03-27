import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";

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
  const { userData } = useContext(AppContext);
  const [editedData, setEditedData] = useState(userData);

  useEffect(() => {
    setEditedData(userData);
  }, [userData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica para guardar los cambios del formulario
  };

  const handleCancel = () => {
    // Lógica para cancelar el formulario
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
          <Input id="email" type="email" name="email" required value={editedData.email} />
        </FormField>
        <FormField>
          <Label htmlFor="userType">Tipo de usuario*</Label>
          <Input id="userType" type="text" name="user_type" required value="Administrador" />
        </FormField>
        <ButtonContainer>
          <Button type="button" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit">Guardar cambios</Button>
        </ButtonContainer>
      </Form>
    </FormWrapper>
  );
};

export default UserForm;
