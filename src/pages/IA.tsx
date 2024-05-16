import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { ApiContext } from "../context/ApiContext";
import { findCollectionById } from "../services/collection_s";
import { getWaterFootprintSuggestion } from "../services/water_footprint_s";
import { Collection, CollectionDataInit } from "../interfaces/collection";
import { IASuggestionDataInit, IASuggestionI } from "../interfaces/WaterFootprint";
import { FormContainer, SignBoard, Suggestion } from "../styles/FormStyles";

export const IA: React.FC = () => {
  const { backendApiCall } = React.useContext(ApiContext);
  const { id } = useParams<{ id: string; type: string }>();
  const [IASuggestion, setIAsuggestion] = useState<IASuggestionI>(IASuggestionDataInit);
  const [collection, setCollection] = useState<Collection>(CollectionDataInit);
  const collectionId = id;
  const cropId = collection?.crop_id;

  useEffect(() => {
    async function loadCollectionDetails() {
      if (collectionId) {
        try {
          const collectionDetails = await findCollectionById(backendApiCall, collectionId);
          if (collectionDetails && collectionDetails.data) {
            setCollection(collectionDetails.data);
          }
        } catch (error) {
          console.log("Error fetching crop details:", error);
        }
      }
    }
    loadCollectionDetails();
  }, [backendApiCall, collectionId]);

  useEffect(() => {
    async function fetchWaterFooprintSuggestion() {
      if (collectionId && cropId) {
        try {
          const response = await getWaterFootprintSuggestion(backendApiCall, collectionId, cropId);
          if (response.status === "success") {
            setIAsuggestion({
              content: response.data,
            });
          } else {
            console.log("Error:", response.message);
          }
        } catch (error) {
          console.log("Error fetching water footprint suggestion:", error);
        }
      }
    }
    fetchWaterFooprintSuggestion();
  }, [backendApiCall, collectionId, cropId]);

  console.log("Sugerencia de IA: ", IASuggestion.content);
  return (
    <>
      <MainLayout>
        <FormContainer>
          <SignBoard $custom>Análisis de IA</SignBoard>
          <Suggestion>{IASuggestion.content}</Suggestion>
        </FormContainer>
      </MainLayout>
    </>
  );
};
