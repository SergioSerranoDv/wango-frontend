import React from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import LoteMenu from "../components/LotMenu";

export const DashboardLots: React.FC = () => {
  const { id } = useParams();
  const lotId = id;
  return (
    <MainLayout>
      <LoteMenu lotId={lotId} />
    </MainLayout>
  );
};
