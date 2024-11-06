import { useState, useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LoadingAnimation } from "../components/Loading";
import { AddRegistry } from "../components/modals/FormModal";
import { Modal } from "../components/modals/Modal";
import { NotificationModal } from "../components/modals/NotificationModal";
import { TableV1 } from "../components/tables/TableV1";
import { ApiContext } from "../context/ApiContext";
import { UseGet } from "../hooks/UseGet";
import { UsePagination } from "../hooks/UsePagination";
import { Collection, CollectionDataInit } from "../interfaces/collection";
import { Crop, CropDataInit } from "../interfaces/crop";
import { Records } from "../interfaces/record";
import { MainLayout } from "../layouts/MainLayout";
import { getCollectionByCropId } from "../services/collection_s";
import { fetchCropDetails } from "../services/crop_s";
import { calculateEt0andETc } from "../services/weather_s";
import { ButtonSecondary } from "../styles/AddLoteStyles";
import { Button, ButtonContainer, Description, SignBoard } from "../styles/FormStyles";

export const CollectionRecords = () => {
  const { id: collectionId = "" } = useParams();
  const { currentPage, setCurrentPage, rowsPerPage, setRowsPerPage } = UsePagination();
  const { data, loading, setRefetch } = UseGet({
    endpoint: `collection-record/paginated?page=${currentPage}&limit=${rowsPerPage}&collection_id=${collectionId}`,
  });

  const { backendApiCall } = useContext(ApiContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cropData, setCropData] = useState<Crop>(CropDataInit);
  const [showNotification, setShowNotification] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingRecordId, setEditingRecordId] = useState<string>();
  const [formData, setFormData] = useState({
    recordName: "",
    eto: 0,
    performance: 0,
    etc: 0,
  });
  // Paginación y datos de evapotranspiración
  const [eto, setEto] = useState(0);
  const [etc, setEtc] = useState(0);

  const [deletingRecordId, setDeletingRecordId] = useState<string | undefined>();

  const handleShowFormModal = () => {
    setEditingRecordId(undefined);
    setShowFormModal(true);
    // Limpiar los datos del formulario
    setFormData({
      recordName: "",
      eto: 0,
      performance: 0,
      etc: 0,
    });
  };

  const handleFormModalClose = () => {
    setEditingRecordId(undefined);
    setShowFormModal(false);
  };

  const handleDelete = async (recordId: string) => {
    setDeletingRecordId(recordId);
    setShowNotification(true); // Mostrar el modal de notificación
  };

  const handleEdit = (record: Records) => {
    setEditingRecordId(record._id);
    setShowFormModal(true);
    setFormData({
      recordName: record.name,
      eto: record.reference_evotranspiration,
      performance: record.daily_performance,
      etc: record.actual_crop_evapotranspiration,
    });
  };

  const handleDeleteConfirmation = async () => {
    if (deletingRecordId) {
      console.log("Eliminando registro con ID:", deletingRecordId);
      try {
        const response = await backendApiCall({
          method: "DELETE",
          endpoint: `collection-record/delete/${deletingRecordId}`,
        });
        if (response.status === "success") {
          setShowNotification(false); // Cerrar el modal de notificación
          setRefetch((prev) => prev + 1);
          setDeletingRecordId(undefined); // Limpiar el ID del registro a eliminar
        } else {
          console.log("Error al eliminar el registro:", response.message);
        }
      } catch (error) {
        console.log("Error al eliminar el registro:", error);
      }
    }
  };

  const columns = useCallback(
    () => [
      {
        title: "Nombre",
        dataIndex: "name",
        render: (record: any) => <span>{record.name}</span>,
      },
      {
        title: "Fecha",
        dataIndex: "createdAt",
        render: (record: any) => <span>{record.createdAt}</span>,
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
    async function fetchEvotranspirationDataFromOpenMeteo() {
      try {
        const { eto, etc } = await calculateEt0andETc();
        setEto(parseFloat(eto));
        setEtc(parseFloat(etc));
      } catch (error) {
        console.log("Error al obtener los datos de evapotranspiración:", error);
      }
    }
    fetchEvotranspirationDataFromOpenMeteo();
  }, []);

  return (
    <MainLayout>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <>
          <SignBoard $custom2>Registros del cultivo {cropData.name}</SignBoard>
          <Header openModal={handleShowFormModal} />
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
        <Modal title="Agregar registro" closeModal={handleFormModalClose}>
          <AddRegistry
            collectionId={collectionId}
            cropname={cropData.name}
            eto={eto}
            currentGrowth={1.75}
            etc={etc}
            recordId={editingRecordId}
            initialData={formData} // Pasar los datos del registro al componente AddRegistry
            onClose={handleFormModalClose}
            setRefetch={setRefetch}
          />
        </Modal>
      )}

      {showNotification && (
        <NotificationModal
          title={`Eliminar registro`}
          description="Estás seguro de que deseas eliminar este registro?"
          status="error"
          buttonText="Eliminar"
          onClose={handleDeleteConfirmation}
          redirectUrl=""
        />
      )}
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
