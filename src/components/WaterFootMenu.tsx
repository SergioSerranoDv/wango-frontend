import React from "react";
import { Button, ButtonSubmit, Form, FormContainer, SignBoard } from "../styles/FormStyles";
import { useGetById } from "../hooks/useGetById";
import { Link } from "react-router-dom";

interface Props {
  lotId?: string;
}

export const WaterFootMenu = ({ lotId = "" }: Props) => {
  const { data } = useGetById({
    endpoint: `v1/lot/info/${lotId}`,
  });

  // Estilo para eliminar la decoración de texto de los enlaces
  const linkStyle = {
    textDecoration: 'none', // Elimina el subrayado de los enlaces
  };

  return (
    <FormContainer>
      <SignBoard $custom2>Lote: {data ? data.name : "Cargando..."}<br/>Selecciona un componente</SignBoard>
      <Form>
        <Link to={`/lot-menu/water-footprint/comp-green/${lotId}`} style={linkStyle}>
          <ButtonSubmit type="button" $custom1 as="div">
            Componente verde
          </ButtonSubmit>
        </Link>
        <Link to={`/lot-menu/water-footprint/comp-blue/${lotId}`} style={linkStyle}>
          <ButtonSubmit type="button" $custom1 $blue as="div">
            Componente azul
          </ButtonSubmit>
        </Link>
        <Link to={`/lot-menu/water-footprint/comp-gray/${lotId}`} style={linkStyle}>
          <ButtonSubmit type="button" $custom1 $gray as="div">
            Componente gris
          </ButtonSubmit>
        </Link>
        <Link to={`/lot-menu/water-footprint/full-wf/${lotId}`} style={linkStyle}>
          <Button type="button" $custom1 as="div">
            Huella hídrica completa
          </Button>
        </Link>
      </Form>
    </FormContainer>
  );
};
