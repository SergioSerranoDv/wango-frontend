import { Link, useParams } from "react-router-dom";
import { ButtonSubmit, Form, FormContainer, SignBoard } from "../styles/FormStyles";
import { MainLayout } from "../layouts/MainLayout";

export const WFComponents = () => {
  const { id } = useParams();
  const collectionId = id;

  const linkStyle = {
    textDecoration: "none",
  };

  return (
    <MainLayout>
      <FormContainer style={{ margin: "auto" }}>
        <SignBoard $custom2>Selecciona un componente</SignBoard>
        <Form>
          <Link
            to={`/lot-menu/water-footprint/crops/comp/${collectionId}/type/green`}
            style={linkStyle}
          >
            <ButtonSubmit type="button" $custom1 as="div">
              Componente verde
            </ButtonSubmit>
          </Link>
          <Link
            to={`/lot-menu/water-footprint/crops/comp/${collectionId}/type/blue`}
            style={linkStyle}
          >
            <ButtonSubmit type="button" $custom1 $blue as="div">
              Componente azul
            </ButtonSubmit>
          </Link>
          <Link
            to={`/lot-menu/water-footprint/crops/comp/${collectionId}/type/grey`}
            style={linkStyle}
          >
            <ButtonSubmit type="button" $custom1 $gray as="div">
              Componente gris
            </ButtonSubmit>
          </Link>
          <Link to={`/lot-menu/water-footprint/crops/comp/${collectionId}/full`} style={linkStyle}>
            <ButtonSubmit type="button" $custom1 $orange as="div">
              Huella hídrica completa
            </ButtonSubmit>
          </Link>
          <Link to={`/lot-menu/water-footprint/crops/comp/${collectionId}/IA`} style={linkStyle}>
            <ButtonSubmit type="button" $custom1 $amber as="div">
              Análisis IA
            </ButtonSubmit>
          </Link>
        </Form>
      </FormContainer>
    </MainLayout>
  );
};
