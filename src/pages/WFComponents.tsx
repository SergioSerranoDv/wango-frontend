import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ApiContext } from "../context/ApiContext";
import { Crop } from "../interfaces/crop";
import { ButtonSubmit, Form, FormContainer, SignBoard } from "../styles/FormStyles";
import { MainLayout } from "../layouts/MainLayout";
import { findCollectionById } from "../services/collection_s";
import { Collection } from "../interfaces/collection";

export const WFComponents = () => {
  const { id } = useParams();
  const collectionId = id;
  const { backendApiCall } = useContext(ApiContext);
  const [refetch, setRefetch] = useState<number>(0);
  const [collectionData, setCollectionData] = useState({} as Collection);
  const [cropData, setCropData] = useState({} as Crop);
  //Obtener datos de la collection
  useEffect(() => {
    const fetchData = async () => {
      const response = await findCollectionById(backendApiCall, collectionId as string);
      if (response.status === "success" && response.data !== undefined) {
        setCollectionData(response.data);
      }
    };
    fetchData();
  }, [backendApiCall, collectionId, refetch]);

  const linkStyle = {
    textDecoration: "none",
  };

  return (
    <MainLayout>
      <FormContainer>
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
