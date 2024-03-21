import {
  FormWrapper,
  Form,
  FormHeader,
  FormField,
  Label,
  Input,
  ButtonContainer,
  Button,
} from "../styles/AddLoteStyles";

function LoteForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica para guardar los cambios del formulario
  };

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <FormHeader>Crea un nuevo lote, ingresa los datos</FormHeader>
        <FormField>
          <Label htmlFor="name">Nombre del lote</Label>
          <Input id="name" type="text" required />
        </FormField>
        <FormField>
          <Label htmlFor="capacity">Capacidad</Label>
          <Input id="capacity" type="text" required />
        </FormField>
        <ButtonContainer>
          <Button type="submit">Añadir Lote</Button>
        </ButtonContainer>
        <FormHeader>
          Podrás añadir un cultivo entrando al lote en específico en la sección anterior.
        </FormHeader>
      </Form>
    </FormWrapper>
  );
}

export default LoteForm;
