import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { TableV1 } from "../components/TableV1";
import { UseGet } from "../hooks/UseGet";
import { ApiContext } from "../context/ApiContext";
import { fetchCropDetails } from "../services/crop_s";
import { Crop } from "../interfaces/crop";
import { Container } from "../styles/GlobalStyles";
import { Text } from "../styles/MainMenuStyles";
import {
  RegisterFormContainer,
  InfoContainer,
  DetailsSign,
  DetailsItem,
} from "../styles/lotscropsStyles";

export const WFCrops: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const collectionId = id || "";
  const { backendApiCall, serviceIsReady } = useContext(ApiContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const { data, loading, setRefetch } = UseGet({
    endpoint: `v1/collection/info/crop/${collectionId}/paginated?page=${currentPage}&limit=${rowsPerPage}`,
  });
  const [cropData, setCropData] = useState({} as Crop);

  useEffect(() => {
    const fetchCropData = async () => {
      const response = await fetchCropDetails(backendApiCall, collectionId);
      if (response.status === "success" && response.data) {
        setCropData(response.data);
        console.log(response.data);
      }
    };

    if (serviceIsReady) {
      fetchCropData();
    }
  }, [collectionId, serviceIsReady]);

  const formattedCollections = data?.collections?.map(
    (collection: { createdAt: string | number | Date; updatedAt: string | number | Date }) => ({
      ...collection,
      createdAt: new Date(collection.createdAt).toLocaleString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      updatedAt: new Date(collection.updatedAt).toLocaleString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    })
  );

  return (
    <div>
      <MainLayout>
        <Container>
          <Text>Recolecciones del cultivo '{cropData.name}'</Text>
          <RegisterFormContainer>
            <InfoContainer>
              <DetailsSign $custom3>
                Área: <DetailsItem>{cropData.area} Ha</DetailsItem>
              </DetailsSign>
              <DetailsSign $custom3>Historial de registros:</DetailsSign>
            </InfoContainer>
          </RegisterFormContainer>
          {!loading && formattedCollections && (
            <TableV1
              evencolor="#FFFFFF"
              oddcolor="rgb(255, 103, 15, 0.2)"
              columns={["id", "Fecha Inicio", "Fecha Fin", "Acciones"]}
              columnMapping={{
                "Fecha Inicio": "createdAt",
                "Fecha Fin": "updatedAt",
              }}
              data={formattedCollections}
              pagination={{
                currentPage,
                setCurrentPage,
                rowsPerPage,
                setRowsPerPage,
                setRefetch,
                totalPages: data?.meta?.total_pages,
              }}
              options={{
                edit: (rowData: any) => {
                  const { _id } = rowData; // Reemplaza "id" con el nombre correcto del campo
                  navigate(`/lot-menu/water-footprint/crops/comp/${_id}`);
                },

                delete: () => {},
              }}
            />
          )}
        </Container>
      </MainLayout>
    </div>
  );
};

export default WFCrops;
