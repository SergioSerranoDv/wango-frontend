import React, { useEffect, useState, useContext } from "react";
import { Container, Table, TableRow, TableCell } from "../styles/LotsTableStyles";
import { fetchLotsPerUser } from "../services/lot_s";
import { ApiContext } from "../context/ApiContext";
import { Lot } from "../interfaces/Lot";

const LotsTable = () => {
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

  const handleEdit = (id: number) => {};

  const handleDelete = (id: number) => {};

  return (
    <Container>
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
    </Container>
  );
};

export default LotsTable;
