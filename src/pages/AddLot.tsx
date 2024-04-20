import React from "react";
import { MainLayout } from "../layouts/MainLayout";
import { LotForm } from "../components/LotForm";

export const AddLot: React.FC = () => {
  return (
    <MainLayout>
      <LotForm />
    </MainLayout>
  );
};
