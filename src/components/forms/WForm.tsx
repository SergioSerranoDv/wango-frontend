import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../../context/ApiContext";
import { searchCollections } from "../../services/collection_s";
import { createNewWaterFootprint } from "../../services/water_footprint_s";
import { Button } from "../../styles/AddLoteStyles";
import { Text } from "../../styles/MainMenuStyles";
import { Searcher } from "../Searcher";

export const WForm: React.FC = () => {
  const navigate = useNavigate();
  const { backendApiCall } = useContext(ApiContext);
  const [selectedCollection, setSelectedCollection] = useState<any>("");

  const calculateWF = async (collectionId: string, crop_id: string) => {
    try {
      const response = await createNewWaterFootprint(backendApiCall, {
        collection_id: collectionId,
        crop_id: crop_id,
      });

      if (response.status === "success") {
        navigate(`/dashboard/water-footprint/components/${selectedCollection._id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Text style={{ textAlign: "left" }}>Seleccionar recolección</Text>
      <Searcher assignResult={setSelectedCollection} searchWorker={searchCollections} />
      <Button
        style={{ marginTop: "2rem" }}
        onClick={() => {
          if (selectedCollection) {
            calculateWF(selectedCollection._id, selectedCollection.crop_id);
          }
        }}
      >
        Continuar
      </Button>
    </>
  );
};
