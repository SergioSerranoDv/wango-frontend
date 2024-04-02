import React, { useEffect, useState, useContext } from "react";
import { Table, TableRow, TableCell } from "../styles/BatchTableStyles";
import { fetchLotsPerUser } from "../services/lot_s";
import { ApiContext } from "../context/ApiContext";
import { Lot } from "../interfaces/Lot";

const BatchTable = () => {
  const { backendApiCall } = useContext(ApiContext);
  const [lots, setLots] = useState<Lot[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const userLots = await fetchLotsPerUser(backendApiCall);
      if (userLots) {
        setLots(userLots);
      }
    };

    fetchData();
  }, [backendApiCall]);

  const handleEdit = (id: number) => {
    // Implementa tu lógica de edición aquí
    console.log(`Editar elemento con ID ${id}`);
  };

  const handleDelete = (id: number) => {
    // Implementa tu lógica de eliminación aquí
    console.log(`Eliminar elemento con ID ${id}`);
  };

  return (
    <div
      style={{
        display: "block",
        maxWidth: "700px",
        margin: "auto",
        paddingTop: "20px",
      }}
    >
      <Table>
        <thead>
          <TableRow index={-1}>
            <TableCell>ID</TableCell>
            <TableCell>Lote</TableCell>
            <TableCell>Capacidad</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </thead>
        <tbody>
          {lots.map((item, index) => (
            <TableRow key={index} index={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.capacity}</TableCell>
              <TableCell>
                <button onClick={() => handleEdit(index + 1)}>Editar</button>
                <button onClick={() => handleDelete(index + 1)}>Eliminar</button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BatchTable;
