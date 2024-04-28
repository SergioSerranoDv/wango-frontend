import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ApiContext } from "../context/ApiContext";
import { Crop } from "../interfaces/crop";
import { fetchCropDetails } from "../services/crop_s";
import { Button, ButtonSubmit, Form, FormContainer, SignBoard } from "../styles/FormStyles";
import { MainLayout } from "../layouts/MainLayout";

export const WFComponents = () => {
  const { id } = useParams();
  const cropId = id;
  const { backendApiCall } = useContext(ApiContext);
  const [refetch, setRefetch] = useState<number>(0);
  const [cropData, setCropData] = useState({} as Crop);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchCropDetails(backendApiCall, cropId as string);
      if (response.status === "success" && response.data !== undefined) {
        setCropData(response.data);
      }
    };
    fetchData();
  }, [backendApiCall, cropId, refetch]);

  const linkStyle = {
    textDecoration: "none",
  };

  return (
    <MainLayout>
      <FormContainer>
        <SignBoard $custom2>Selecciona un componente</SignBoard>
        <Form>
          <Link to={`/lot-menu/water-footprint/crops/comp-green/${cropId}`} style={linkStyle}>
            <ButtonSubmit type="button" $custom1 as="div">
              Componente verde
            </ButtonSubmit>
          </Link>
          <Link to={`/lot-menu/water-footprint/crops/comp-blue/${cropId}`} style={linkStyle}>
            <ButtonSubmit type="button" $custom1 $blue as="div">
              Componente azul
            </ButtonSubmit>
          </Link>
          <Link to={`/lot-menu/water-footprint/crops/comp-gray/${cropId}`} style={linkStyle}>
            <ButtonSubmit type="button" $custom1 $gray as="div">
              Componente gris
            </ButtonSubmit>
          </Link>
          <Link to={`/lot-menu/water-footprint/crops/full-wf/${cropId}`} style={linkStyle}>
            <ButtonSubmit type="button" $custom1 $orange as="div">
              Huella hídrica completa
            </ButtonSubmit>
          </Link>
        </Form>
      </FormContainer>
    </MainLayout>
  );
};
