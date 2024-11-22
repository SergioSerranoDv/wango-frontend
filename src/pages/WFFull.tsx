import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ApiContext } from "../context/ApiContext";
import { waterFootprintDataInit } from "../interfaces/WaterFootprint";
import { Collection, CollectionDataInit } from "../interfaces/collection";
import { MainLayout } from "../layouts/MainLayout";
import { findCollectionById } from "../services/collection_s";
import { findCropById } from "../services/crop_s";
import { getWaterFootprintByCropIdAndCollectionId } from "../services/water_footprint_s";
import { Adder, ContainerInput, FormContainer, Input, Label, SubLabel } from "../styles/FormStyles";
import {
  DetailsItem,
  DetailsSign,
  InfoContainer,
  SignBoard,
  SignBoard3,
} from "../styles/lotscropsStyles";

export const WFFull: React.FC = () => {
  const { backendApiCall } = useContext(ApiContext);
  const [waterFootprint, setWaterFootprint] = useState<any>(waterFootprintDataInit);
  const { id, type } = useParams<{ id: string; type: string }>();
  const collectionId = id;
  const [collection, setCollection] = useState<Collection>(CollectionDataInit);
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [crop, setCrop] = useState({
    _id: "",
    area: 0,
    lot_id: "",
    name: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
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
    async function loadCropDetails() {
      if (cropId) {
        try {
          const cropDetails = await findCropById(backendApiCall, cropId);
          if (cropDetails && cropDetails.data) {
            setCrop(cropDetails.data);
          }
        } catch (error) {
          console.log("Error fetching crop details:", error);
        }
      }
    }
    loadCropDetails();
  }, [backendApiCall, cropId]);

  useEffect(() => {
    async function fetchWaterFootprint() {
      if (collectionId && cropId) {
        try {
          const waterFootprint = await getWaterFootprintByCropIdAndCollectionId(
            backendApiCall,
            collectionId,
            cropId
          );
          if (waterFootprint && waterFootprint.data) {
            console.log("Water Footprint: ", waterFootprint.data);
            setWaterFootprint(waterFootprint.data);
          }
        } catch (error) {
          console.log("Error fetching water footprint:", error);
        }
      }
    }
    fetchWaterFootprint();
  }, [backendApiCall, collectionId, cropId]);
  console.log("Water Footprint: ", waterFootprint);
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
          <Input disabled type="number" id="HHv" $custom1 value={waterFootprint.green_component} />
        </ContainerInput>
        <Adder>+</Adder>
        <ContainerInput $custom1>
          <Label htmlFor="WateFGreen" $custom1>
            HH
          </Label>
          <SubLabel>azul </SubLabel>
          =
          <Input disabled type="number" id="HHv" $custom1 value={waterFootprint.blue_component} />
        </ContainerInput>
        <Adder>+</Adder>
        <ContainerInput $custom4>
          <Label htmlFor="WateFGreen" $custom1>
            HH
          </Label>
          <SubLabel>gris </SubLabel>
          =
          <Input disabled type="number" id="HHv" $custom1 value={waterFootprint.grey_component} />
        </ContainerInput>
        <ContainerInput $custom2> </ContainerInput>
        <ContainerInput $custom4>
          <Label htmlFor="WateFGreen" $custom1>
            HH
          </Label>
          <SubLabel>total</SubLabel>
          =
          <Input disabled type="number" id="HHv" $custom1 value={waterFootprint.total} />
        </ContainerInput>
      </MainLayout>
    </div>
  );
};
