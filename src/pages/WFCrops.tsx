import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { TableV1 } from "../components/TableV1";
import { UseGet } from "../hooks/UseGet";
import { ApiContext } from "../context/ApiContext";
import { fetchCropDetails } from "../services/crop_s";
import { Crop } from "../interfaces/crop";
import { Container } from "../styles/GlobalStyles";
import { Text } from "../styles/MainMenuStyles";
import {
  Button,
  DetailsItem,
  DetailsSign,
  InfoContainer,
  Link,
  RegisterFormContainer,
  SignBoard,
} from "../styles/lotscropsStyles";

export const WFCrops: React.FC = () => {
  const { id } = useParams();
  const cropId = id || "";
  const { backendApiCall, serviceIsReady } = useContext(ApiContext);
  const [refetch, setRefetch] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const {
    data,
    loading,
    setRefetch: setRefetchData,
  } = UseGet({
    endpoint: `v1/crop/paginated?page=${currentPage}&limit=${rowsPerPage}&crop_id=${cropId}`,
  });
  const [cropData, setCropData] = useState({} as Crop);

  useEffect(() => {
    const fetchCropData = async () => {
      const response = await fetchCropDetails(backendApiCall, cropId);
      if (response.status === "success" && response.data) {
        setCropData(response.data);
      }
    };

    if (serviceIsReady) {
      fetchCropData();
    }
  }, [cropId, serviceIsReady]);

  const handleEdit = (crop: Crop) => {
    window.open(`/lot-menu/water-footprint/crops/${crop._id}`, "_self");
  };

  const handleDelete = async (cropId: string) => {
    // Implementation needed
  };

  return (
    <div>
      <MainLayout>
        <Container>
          <Text>Registros del cultivo '{cropData.name}'</Text>
          <RegisterFormContainer>
            <InfoContainer>
              <DetailsSign $custom3>
                Área: <DetailsItem>{cropData.area} Ha</DetailsItem>
              </DetailsSign>
              <DetailsSign $custom3>Historial de registros:</DetailsSign>
            </InfoContainer>
          </RegisterFormContainer>
          {!loading && data && data.crops && data.crops.length > 0 && (
            <TableV1
              columns={["Fecha inicio", "Fecha fin", "Acciones"]}
              columnMapping={{
                FechaInicio: "name",
                FechaFin: "area",
              }}
              data={data.crops}
              pagination={{
                currentPage,
                setCurrentPage,
                rowsPerPage,
                setRowsPerPage,
                setRefetch: setRefetchData,
                totalPages: data.meta.total_pages,
              }}
              options={{ edit: handleEdit, delete: handleDelete }}
            />
          )}
        </Container>
      </MainLayout>
    </div>
  );
};
