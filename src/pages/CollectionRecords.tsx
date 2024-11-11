import { useState, useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LoadingAnimation } from "../components/Loading";
import { AddRegistry } from "../components/modals/FormModal";
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
import { ButtonSecondary } from "../styles/AddLoteStyles";
import { Description, SignBoard } from "../styles/FormStyles";

export const CollectionRecords = () => {
  const { id: collectionId = "" } = useParams();
  const { currentPage, setCurrentPage, rowsPerPage, setRowsPerPage } = UsePagination();
  const { data, loading, setRefetch } = UseGet({
    endpoint: `collection-record/paginated?page=${currentPage}&limit=${rowsPerPage}&collection_id=${collectionId}`,
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
          <Header openModal={() => setShowFormModal(true)} />
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
        <Modal title="Agregar registro" closeModal={() => setShowFormModal(false)}>
          <AddRegistry
            collectionId={collectionId}
            crop={cropData}
            currentGrowth={1.75}
            onClose={() => setShowFormModal(false)}
            setRefetch={setRefetch}
          />
        </Modal>
      )}

      {/* {showNotification && (
        <NotificationModal
          title={`Eliminar registro`}
          description="Estás seguro de que deseas eliminar este registro?"
          status="error"
          buttonText="Eliminar"
          onClose={handleDeleteConfirmation}
          redirectUrl=""
        />
      )} */}
    </MainLayout>
  );
};

const Header: React.FC<{ openModal: () => void }> = ({ openModal }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "32px",
      alignItems: "center",
    }}
  >
    <Description className="customDescription" style={{ margin: "0" }}>
      Nota: Siendo administrador puedes ver los registros hechos por los usuarios encargados que has
      asignado a este cultivo. Incluso puedes hacer uno tu.
    </Description>
    <ButtonSecondary onClick={openModal}>
      <span>
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginRight: "6px" }}
        >
          <path d="M11 13v6h2v-6h6v-2h-6V5h-2v6H5v2h6z" fill="currentColor"></path>
        </svg>
      </span>
      Agregar registro
    </ButtonSecondary>
  </div>
);
