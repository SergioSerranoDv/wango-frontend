import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoteFormEdit from "../components/LoteFormEdit";

export default function EditLote() {
  const { id } = useParams(); // Obtener el ID del lote de la URL

  // Supongamos que obtienes el userId y el lotId de algún lugar
  const userId = "google-oauth2|116221184137793501360"; // Reemplaza con el ID del usuario actual
  const lotId = id; // Utilizamos el ID del lote obtenido de la URL

  return (
    <div>
      <Navbar />
      <LoteFormEdit lotId={lotId} userId={userId} />
    </div>
  );
}
