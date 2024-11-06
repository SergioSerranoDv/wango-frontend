import React, { useCallback, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { TableV1 } from "../components/tables/TableV1";
import { UseGet } from "../hooks/UseGet";
import { ApiContext } from "../context/ApiContext";
import { fetchCropDetails } from "../services/crop_s";
import { Crop } from "../interfaces/crop";
import { Collection } from "../interfaces/collection";
import { Text } from "../styles/MainMenuStyles";
import { CollectionActions } from "../components/actions/CollectionActions";

export const Collections: React.FC = () => {
  const { id } = useParams();
  const cropId = id || "";
  const { backendApiCall, serviceIsReady } = useContext(ApiContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const { data, loading, setRefetch } = UseGet({
    endpoint: `collection/info/crop/${cropId}/paginated?page=${currentPage}&limit=${rowsPerPage}`,
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

  const columns = useCallback(
    () => [
      {
        title: "Nombre",
        dataIndex: "name",
        render: (record: Collection) => <span>{record.name}</span>,
      },
      {
        title: "Fecha Inicio",
        dataIndex: "createdAt",
        render: (record: Collection) => <span>{record.createdAt}</span>,
      },
      {
        title: "Fecha Fin",
        dataIndex: "_id",
        render: (record: any) => <span>{record.updatedAt ? record.updatedAt : "En proceso"}</span>,
      },
      {
        title: "Estado",
        dataIndex: "status",
        render: (record: Collection) => (
          <span>{record.status === "in_progress" ? "Activa" : "Finalizado"}</span>
        ),
      },
      {
        title: "Acciones",
        dataIndex: "_id",
        render: (record: Collection) => (
          <CollectionActions collectionDetails={record} refetchCollections={setRefetch} />
        ),
      },
    ],
    []
  );

  return (
    <MainLayout>
      <Text style={{ marginBottom: "2rem" }}>Recolecciones del cultivo '{cropData.name}'</Text>
      {!loading && formattedCollections && (
        <TableV1
          evencolor="#FFFFFF"
          oddcolor="rgb(255, 103, 15, 0.2)"
          columns={columns()}
          data={formattedCollections}
          pagination={{
            currentPage,
            setCurrentPage,
            rowsPerPage,
            setRowsPerPage,
            setRefetch,
            totalPages: data?.meta?.total_pages,
          }}
        />
      )}
    </MainLayout>
  );
};
