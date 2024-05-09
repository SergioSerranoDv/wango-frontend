import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoteMenu from "../components/LotMenu";

export const DashboardLots: React.FC = () => {
  const { id } = useParams();
  const lotId = id;
  return (
    <>
      <Navbar />
      <LoteMenu lotId={lotId} />
    </>
  );
};
