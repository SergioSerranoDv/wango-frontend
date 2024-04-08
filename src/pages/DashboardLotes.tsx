import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoteMenu from "../components/LoteMenu";

export default function EditLote() {
  const { id } = useParams();
  const lotId = id;

  return (
    <div>
      <Navbar />
      <LoteMenu lotId={lotId} />
    </div>
  );
}
