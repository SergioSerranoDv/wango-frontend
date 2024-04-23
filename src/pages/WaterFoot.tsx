import React from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { WaterFootMenu } from "../components/WaterFootMenu";

export const WaterFoot: React.FC = () => {
  const { id } = useParams();
  const lotId = id;
  return (
    <MainLayout>
      <WaterFootMenu lotId={lotId} />
    </MainLayout>
  );
};
