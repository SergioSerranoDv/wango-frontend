import React from "react";
import { useParams } from "react-router-dom";
import { LotFormEdit } from "../components/LotFormEdit";
import { MainLayout } from "../layouts/MainLayout";

export const EditLot: React.FC = () => {
  const { id } = useParams();
  const lotId = id;

  return (
    <MainLayout>
      <LotFormEdit lotId={lotId} />
    </MainLayout>
  );
};
