import React from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { CropFormEdit } from "../components/CropFormEdit";

export const EditCrop: React.FC = () => {
  const { id } = useParams();
  const cropId = id;
  return (
    <MainLayout>
      <CropFormEdit cropId={cropId} />{" "}
    </MainLayout>
  );
};
