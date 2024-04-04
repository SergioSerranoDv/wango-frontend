import Navbar from "../components/Navbar";
import { ApiContext } from "../context/ApiContext";
import { Lot } from "../interfaces/Lot";
import { Container, Table, TableRow, TableCell, TableRow2 } from "../styles/LotsTableStyles";
import {
  Button,
  Description,
  DetailsItem,
  DetailsSign,
  InfoContainer,
  Link,
  RegisterFormContainer,
  SignBoard,
} from "../styles/lotscropsStyles";
import React, { useContext, useEffect, useState } from "react";

export default function LotsCrops() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <Navbar />
      <RegisterFormContainer>
        <SignBoard $custom1>Cultivos del lote ‘ExampleName2’</SignBoard>
        <InfoContainer>
          <DetailsSign $custom3>
            ID lote: <DetailsItem>24 Example</DetailsItem>
          </DetailsSign>
          <DetailsSign $custom3>
            Área disponible: <DetailsItem>2,7 Example Ha</DetailsItem>
          </DetailsSign>
          <DetailsSign $custom3>
            Área en ocupación: <DetailsItem>17,3 Example Ha</DetailsItem>
          </DetailsSign>
          <DetailsSign $custom3>Cultivos:</DetailsSign>
        </InfoContainer>

        <Container $custom>
          <Table>
            <thead>
              <TableRow index={-1}>
                <TableCell $custom>ID</TableCell>
                <TableCell $custom>Cultivos</TableCell>
                <TableCell $custom>Área</TableCell>
                <TableCell $custom>Acciones</TableCell>
              </TableRow>
            </thead>
            <tbody>
              <TableRow index={1}>
                <TableCell $custom1>1</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <a>Edi </a>
                  <a> Eli </a>
                </TableCell>
              </TableRow>
              <TableRow index={2}>
                <TableCell $custom1>2</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <a>Edi </a>
                  <a> Eli </a>
                </TableCell>
              </TableRow>
              <TableRow index={3}>
                <TableCell $custom1>3</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <a>Edi </a>
                  <a> Eli </a>
                </TableCell>
              </TableRow>
            </tbody>
          </Table>
        </Container>
        <SignBoard $custom3>
          ¿Quieres añadir un cultivo? <Link $custom3>¡Hazlo aquí!</Link>
        </SignBoard>
        <Button type="submit" $custom1>
          Crear nuevo encargado
        </Button>
        <InfoContainer>
          <DetailsSign $custom3>Usuarios encargados:</DetailsSign>
        </InfoContainer>
        <Container>
          <Table $custom>
            <thead>
              <TableRow index={-1}>
                <TableCell $custom>ID</TableCell>
                <TableCell $custom>Nombres</TableCell>
                <TableCell $custom>Acciones</TableCell>
              </TableRow>
            </thead>
            <tbody>
              <TableRow2 index={1}>
                <TableCell $custom1>1</TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <a>Edi </a>
                  <a> Eli </a>
                </TableCell>
              </TableRow2>
              <TableRow2 index={2}>
                <TableCell $custom1>2</TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <a>Edi </a>
                  <a> Eli </a>
                </TableCell>
              </TableRow2>
              <TableRow2 index={3}>
                <TableCell $custom1>3</TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <a>Edi </a>
                  <a> Eli </a>
                </TableCell>
              </TableRow2>
            </tbody>
          </Table>
        </Container>
      </RegisterFormContainer>
    </div>
  );
}
