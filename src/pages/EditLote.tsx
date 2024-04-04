import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoteFormEdit from "../components/LoteFormEdit";

export default function EditLote() {
  const { id } = useParams();
  const lotId = id;

  return (
    <div>
      <Navbar />
      <LoteFormEdit lotId={lotId} />
    </div>
  );
}
