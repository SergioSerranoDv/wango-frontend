import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoteFormEdit from "../components/LoteFormEdit";

export default function EditLote() {
  const { id } = useParams<{ id?: string }>(); // Indica que 'id' podría ser 'undefined'

  return (
    <div>
      <Navbar />
      {id && <LoteFormEdit lotId={id} />} {/* Verifica si 'id' no es 'undefined' antes de pasarla al componente */}
    </div>
  );
}
