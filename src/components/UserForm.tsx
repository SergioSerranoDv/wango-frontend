import {
  FormWrapper,
  Form,
  FormHeader,
  FormField,
  Label,
  InlineContainer,
  Dropdown,
  DropdownItem,
  IdInput,
  Input,
  ButtonContainer,
  Button,
} from "../styles/UserFormStyles";

function UserForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica para guardar los cambios del formulario
  };

  const handleCancel = () => {
    // Lógica para cancelar el formulario
  };

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <FormHeader>Información de usuario</FormHeader>
        <InlineContainer>
          <div style={{ display: "flex", width: "100%", gap: "1em" }}>
            <FormField style={{ width: "30%" }}>
              <Label htmlFor="identificationType">Tipo*</Label>
              <Dropdown style={{ width: "100%" }} id="identificationType" required>
                <DropdownItem value="CC">CC</DropdownItem>
                <DropdownItem value="CE">CE</DropdownItem>
              </Dropdown>
            </FormField>
            <FormField style={{ width: "70%" }}>
              <Label htmlFor="identification">Identificación*</Label>
              <IdInput style={{ width: "100%" }} id="identification" type="text" required />
            </FormField>
          </div>
        </InlineContainer>
        <FormField>
          <Label htmlFor="name">Nombre*</Label>
          <Input id="name" type="text" required />
        </FormField>
        <FormField>
          <Label htmlFor="lastName">Apellidos*</Label>
          <Input id="lastName" type="text" required />
        </FormField>
        <FormField>
          <Label htmlFor="email">Correo*</Label>
          <Input id="email" type="email" required />
        </FormField>
        <FormField>
          <Label htmlFor="userType">Tipo de usuario*</Label>
          <Input id="userType" type="text" required />
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
}

export default UserForm;
