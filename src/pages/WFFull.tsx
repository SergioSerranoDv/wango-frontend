import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LotDataInit } from "../interfaces/Lot";
import { NotificationModal } from "../components/modals/NotificationModal";
import { MainLayout } from "../layouts/MainLayout";
import { TableV1 } from "../components/TableV1";
import { UseGet } from "../hooks/UseGet";
import { ApiContext } from "../context/ApiContext";
import { fetchLotDetails } from "../services/lot_s";
import { Crop } from "../interfaces/crop";
import { Container } from "../styles/GlobalStyles";
import { Text } from "../styles/MainMenuStyles";
import {
  Button,
  DetailsItem,
  DetailsSign,
  InfoContainer,
  Link,
  RegisterFormContainer,
  SignBoard,
  SignBoard3,
} from "../styles/lotscropsStyles";
import { Adder, ContainerInput, FormContainer, Input, Label, SubLabel } from "../styles/FormStyles";
import { findCollectionById } from "../services/collection_s";
import { Collection, CollectionDataInit } from "../interfaces/collection";
import { fetchCropDetails } from "../services/crop_s";

export const WFFull: React.FC = () => {
  const { backendApiCall } = useContext(ApiContext);
  const { id, type } = useParams<{ id: string; type: string }>();
  const collectionId = id;
  const [collection, setCollection] = useState<Collection>(CollectionDataInit);
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [crop, setCrop] = useState<Crop>({
    _id: "",
    area: 0,
    lot_id: "",
    name: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    console.log("Tipo de componente: ", type);
    console.log("CollectionID: ", collectionId);
    async function loadCollectionDetails() {
      if (collectionId) {
        try {
          const collectionDetails = await findCollectionById(backendApiCall, collectionId);
          if (collectionDetails && collectionDetails.data) {
            setCollection(collectionDetails.data);
            // setFormattedCollection(collectionDetails.data);
            console.log("Collection Data: ", collectionDetails.data);

            // Verifica si las fechas son válidas antes de intentar formatearlas
            if (collectionDetails && collectionDetails.data) {
              const initialDate = collectionDetails.data.createdAt;
              const finalDate = collectionDetails.data.updatedAt;
              const formattedInitialDate = new Date(initialDate).toLocaleString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              const formattedFinalDate = new Date(finalDate).toLocaleString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              setInitialDate(formattedInitialDate);
              setFinalDate(formattedFinalDate);
            }
          }
        } catch (error) {
          console.log("Error fetching crop details:", error);
        }
      }
    }
    loadCollectionDetails();
    console.log("Collection V2: ", collection);
  }, [backendApiCall, collectionId]);

  const cropId = collection?.crop_id;

  useEffect(() => {
    console.log("CropID: ", collection?.crop_id);
    async function loadCropDetails() {
      if (cropId) {
        try {
          const cropDetails = await fetchCropDetails(backendApiCall, cropId);
          if (cropDetails && cropDetails.data) {
            setCrop(cropDetails.data);
          }
        } catch (error) {
          console.log("Error fetching crop details:", error);
        }
      }
    }
    loadCropDetails();
    console.log("Crop: ", crop);
  }, [backendApiCall, cropId]);

  return (
    <div>
      <MainLayout>
        <FormContainer $custom1>
          <SignBoard $custom2>Huella híridca para la recolección</SignBoard>
          <SignBoard3 $custom4>
            {initialDate ? `${initialDate} - ` : ""}
            {finalDate ? `${finalDate}` : ""}
          </SignBoard3>
          <InfoContainer>
            <DetailsSign $custom3>
              Nombre de recolección:
              <DetailsItem> {collection?.name}</DetailsItem>
            </DetailsSign>
            <DetailsSign $custom3>
              Nombre del cultivo: <DetailsItem>{crop?.name}</DetailsItem>
            </DetailsSign>
          </InfoContainer>
        </FormContainer>
        <ContainerInput $custom1>
          <Label htmlFor="WateFGreen" $custom1>
            HH
          </Label>
          <SubLabel>verde</SubLabel>
          =
          <Input disabled type="number" id="HHv" $custom1 />
        </ContainerInput>
        <Adder>+</Adder>
        <ContainerInput $custom1>
          <Label htmlFor="WateFGreen" $custom1>
            HH
          </Label>
          <SubLabel>azul </SubLabel>
          =
          <Input disabled type="number" id="HHv" $custom1 />
        </ContainerInput>
        <Adder>+</Adder>
        <ContainerInput $custom4>
          <Label htmlFor="WateFGreen" $custom1>
            HH
          </Label>
          <SubLabel>gris </SubLabel>
          =
          <Input disabled type="number" id="HHv" $custom1 />
        </ContainerInput>
        <ContainerInput $custom2> </ContainerInput>
        <ContainerInput $custom4>
          <Label htmlFor="WateFGreen" $custom1>
            HH
          </Label>
          <SubLabel>total</SubLabel>
          =
          <Input disabled type="number" id="HHv" $custom1 />
        </ContainerInput>
      </MainLayout>
    </div>
  );
};
