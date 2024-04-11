import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ApiContext } from "../context/ApiContext";
import { Container } from "../styles/GlobalStyles";
import { fetchLotDetails } from "../services/lot_s";
import { fetchPaginatedCropsByLotId } from "../services/crop_s";
import { TableV1 } from "../components/TableV1";
import { UseGet } from "../hooks/UseGet";
import { Table, TableRow, TableCell, TableRow2 } from "../styles/LotsTableStyles";
import {
  Button,
  DetailsItem,
  DetailsSign,
  InfoContainer,
  Link,
  RegisterFormContainer,
  SignBoard,
} from "../styles/lotscropsStyles";

export default function LotsCrops() {
  const { id } = useParams();
  const lotId = id || "";
  const { backendApiCall } = useContext(ApiContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, loading, setRefetch } = UseGet(
    fetchPaginatedCropsByLotId(backendApiCall, {
      page: currentPage,
      limit: 5,
      lotId: lotId,
    })
  );
  const [Lot, setLot] = useState<{
    id: string | undefined;
    name: string;
    available_capacity: number;
    capacity_in_use: number | undefined;
  }>({
    id: "",
    name: "",
    available_capacity: 0,
    capacity_in_use: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchLotDetails(backendApiCall, lotId);
      if (response) {
        setLot({
          id: response._id,
          name: response.name,
          available_capacity: response.available_capacity,
          capacity_in_use: response.capacity_in_use,
        });
      }
    };
    fetchData();
  }, [lotId]);

  return (
    <div>
      <Navbar />
      <Container>
        <RegisterFormContainer>
          <SignBoard>Cultivos del lote {Lot.name} </SignBoard>
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
          {!loading && data.crops.length > 0 && (
            <TableV1
              columns={["ID", "Cultivos", "Área", "Acciones"]}
              columnMapping={{
                Cultivos: "name",
                Área: "area",
              }}
              data={data.crops}
              pagination={{
                currentPage,
                setCurrentPage,
                setRefetch,
                totalPages: data.meta.total_pages,
              }}
              options={{ edit: () => {}, delete: () => {} }}
            />
          )}
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
      </Container>
    </div>
  );
}
