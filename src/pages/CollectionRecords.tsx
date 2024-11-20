import { useState, useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { LoadingAnimation } from "../components/Loading";
import { RecordForm } from "../components/forms/RecordForm";
import { Modal } from "../components/modals/Modal";
import { TableV1 } from "../components/tables/TableV1";
import { ApiContext } from "../context/ApiContext";
import { UseGet } from "../hooks/UseGet";
import { UsePagination } from "../hooks/UsePagination";
import { Crop, CropDataInit } from "../interfaces/crop";
import { MainLayout } from "../layouts/MainLayout";
import { formatDate } from "../services/Date";
import { findCollectionById } from "../services/collection_s";
import { findCropById } from "../services/crop_s";
import { SignBoard } from "../styles/FormStyles";
import { Button } from "../styles/FormStyles";

export const CollectionRecords = () => {
  const { id: collectionId = "" } = useParams();
  const { currentPage, setCurrentPage, rowsPerPage, setRowsPerPage } = UsePagination();
  const { data, loading, setRefetch } = UseGet({
    endpoint: `v1/collection-record/paginated?page=${currentPage}&limit=${rowsPerPage}&collection_id=${collectionId}`,
  });
  const [isloadingCrop, setIsLoadingCrop] = useState(true);
  const { backendApiCall } = useContext(ApiContext);
  const [cropData, setCropData] = useState<Crop>(CropDataInit);
  const [showFormModal, setShowFormModal] = useState(false);

  const columns = useCallback(
    () => [
      {
        title: "Fecha de creación",
        dataIndex: "createdAt",
        render: (record: any) => <span>{formatDate(record.createdAt)}</span>,
      },
      {
        title: "Nombre",
        dataIndex: "name",
        render: (record: any) => <span>{record.name}</span>,
      },

      {
        title: "Eto (mm/día)",
        dataIndex: "reference_evotranspiration",
        render: (record: any) => <span>{record.reference_evotranspiration}</span>,
      },
      {
        title: "Etc (mm/día)",
        dataIndex: "actual_crop_evapotranspiration",
        render: (record: any) => <span>{record.actual_crop_evapotranspiration}</span>,
      },
      {
        title: "Rendimiento (kg)",
        dataIndex: "daily_performance",
        render: (record: any) => <span>{record.daily_performance}</span>,
      },

      {
        title: "Acciones",
        dataIndex: "_id",
        render: (record: any) => (
          <div></div>
          // <LotActions lotDetails={lot} refetchLotDetails={() => setRefetch((prev) => prev + 1)} />
        ),
      },
    ],
    []
  );

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const collectionResponse = await findCollectionById(backendApiCall, collectionId);
        if (collectionResponse.status === "success") {
          const cropResponse = await findCropById(backendApiCall, collectionResponse.data.crop_id);
          if (cropResponse.status === "success") {
            setCropData(cropResponse.data);
          }
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setIsLoadingCrop(false);
      }
    };
    fetchDetails();
  }, [backendApiCall, collectionId]);

  return (
    <MainLayout>
      {loading || isloadingCrop ? (
        <LoadingAnimation />
      ) : (
        <>
          <SignBoard $custom2>Registros del cultivo {cropData.name}</SignBoard>
          <Header
            description="Recuerda que puedes agregar un nuevo registro en cualquier momento."
            title="Crear registro"
            openModal={() => setShowFormModal(true)}
          />
          <TableV1
            columns={columns()}
            data={data.collectionRecords}
            evencolor="#FFFFFF"
            oddcolor="rgb(6, 182, 212, 0.2)"
            pagination={{
              rowsPerPage,
              setRowsPerPage,
              currentPage,
              setCurrentPage,
              setRefetch,
              totalPages: data.meta.total_pages,
            }}
            title="Registros de la recolección"
          />
        </>
      )}

      {showFormModal && (
        <Modal
          footer={
            <Button type="submit" form="record-form">
              crear
            </Button>
          }
          title="Nuevo registro"
          closeModal={() => setShowFormModal(false)}
        >
          <RecordForm
            collectionId={collectionId}
            crop={cropData}
            currentGrowth={1.75}
            onClose={() => setShowFormModal(false)}
            setRefetch={setRefetch}
          />
        </Modal>
      )}
    </MainLayout>
  );
};
