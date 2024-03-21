import React from "react";
import { Table, TableRow, TableCell } from "../styles/BatchTableStyles";

const BatchTable = () => {
  const data = [
    { id: 1, name: "Lote1", age: "20 Ha" },
    { id: 2, name: "Lote2", age: "30 Ha" },
  ];

  const handleEdit = (id: number) => {
    // Implement your edit logic here
    console.log(`Edit item with id ${id}`);
  };

  const handleDelete = (id: number) => {
    // Implement your delete logic here
    console.log(`Delete item with id ${id}`);
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
          {data.map((item, index) => (
            <TableRow key={item.id} index={index}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.age}</TableCell>
              <TableCell>
                <button onClick={() => handleEdit(item.id)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BatchTable;
