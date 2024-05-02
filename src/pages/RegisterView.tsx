import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ApiContext } from "../context/ApiContext";
import { calculateEt0andETc } from "../services/weather_s";
import { fetchCropDetails } from "../services/crop_s";
import { getCollectionByCropId } from "../services/collection_s";
import { Records } from "../interfaces/record";
import { Collection, CollectionDataInit } from "../interfaces/collection";
import { Crop, CropDataInit } from "../interfaces/crop";
import { MainLayout } from "../layouts/MainLayout";
import { TableV1 } from "../components/TableV1";
import { LoadingAnimation } from "../components/Loading";
import { NotificationModal } from "../components/modals/NotificationModal";
import { AddRegistry } from "../components/modals/FormModal";
import { ButtonContainer, Button, Description, SignBoard } from "../styles/FormStyles";

export const RegisterView = () => {
  // Hooks y estado inicial
  const { id: cropId = "" } = useParams();
  const { backendApiCall } = useContext(ApiContext);
  const [collection, setCollection] = useState<Collection>(CollectionDataInit);
  const [cropData, setCropData] = useState<Crop>(CropDataInit);
  const [collectionRecords, setCollectionRecords] = useState<Records[]>([]);
  const [loadingCollectionData, setLoadingCollectionData] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingRecordId, setEditingRecordId] = useState<string>();
  const [formData, setFormData] = useState({
    recordName: "",
    eto: 0,
    performance: 0,
    etc: 0,
    ar: 0,
  });
  const [refetch, setRefetch] = useState(0);
  const [deletingRecordId, setDeletingRecordId] = useState<string | undefined>();

  // Paginación y datos de evapotranspiración
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [eto, setEto] = useState(0);
  const [etc, setEtc] = useState(0);

  useEffect(() => {
    async function fetchCollectionRecords() {
      if (cropId) {
        try {
          // Subprocess 1: Obtener la colección por el ID del cultivo para obtener el ID de la colección
          const response = await getCollectionByCropId(backendApiCall, cropId);
          if (response.status === "success") {
            setCollection(response.data);
            // Subprocess 2: Obtener los registros de la colección por el ID de la colección
            const collectionRecords = await backendApiCall({
              method: "GET",
              endpoint: `v1/collection-record/paginated?page=${currentPage}&limit=${rowsPerPage}&collection_id=${response.data._id}`,
            });
            const formattedRecords = collectionRecords.data.collectionRecords.map(
              (record: any) => ({
                ...record,
                createdAt: new Date(record.createdAt).toLocaleString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }),
              })
            );
            setCollectionRecords(formattedRecords);
            setTotalPages(collectionRecords.data.meta.total_pages);
            setLoadingCollectionData(false);
          } else {
            console.log("Error al obtener el estado de la colección:", response.message);
          }
        } catch (error) {
          console.log("Error al obtener los datos de la colección:", error);
        }
      }
    }

    async function fetchCropData() {
      try {
        const response = await fetchCropDetails(backendApiCall, cropId);
        if (response.status === "success") {
          setCropData(response.data);
        }
      } catch (error) {
        console.log("Error al obtener los detalles del cultivo:", error);
      }
    }

    async function fetchEvotranspirationDataFromOpenMeteo() {
      try {
        const { eto, etc } = await calculateEt0andETc();
        setEto(parseFloat(eto));
        setEtc(parseFloat(etc));
      } catch (error) {
        console.log("Error al obtener los datos de evapotranspiración:", error);
      }
    }

    fetchCollectionRecords();
    fetchCropData();
    fetchEvotranspirationDataFromOpenMeteo();
  }, [backendApiCall, cropId, currentPage, rowsPerPage, refetch]);

  const handleShowFormModal = () => {
    setEditingRecordId(undefined);
    setShowFormModal(true);
    // Limpiar los datos del formulario
    setFormData({
      recordName: "",
      eto: 0,
      performance: 0,
      etc: 0,
      ar: 0,
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
      ar: record.amount_chemicals_used,
    });
  };

  const handleDeleteConfirmation = async () => {
    if (deletingRecordId) {
      console.log("Eliminando registro con ID:", deletingRecordId);
      try {
        const response = await backendApiCall({
          method: "DELETE",
          endpoint: `v1/collection-record/delete/${deletingRecordId}`,
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

  if (loadingCollectionData) return <LoadingAnimation />;

  return (
    <MainLayout>
      <SignBoard $custom2>Registros del cultivo {cropData.name}</SignBoard>
      <Description className="customDescription">
        Nota: Siendo administrador puedes ver los registros hechos por los usuarios encargados que
        has asignado a este cultivo. Incluso puedes hacer uno tu.
      </Description>
      {!loadingCollectionData && collectionRecords.length > 0 && (
        <TableV1
          evencolor="#FFFFFF"
          oddcolor="rgb(6, 182, 212, 0.2)"
          data={collectionRecords}
          pagination={{
            rowsPerPage,
            setRowsPerPage,
            currentPage,
            setCurrentPage,
            setRefetch,
            totalPages: totalPages,
          }}
          columns={["ID", "Nombre", "Fecha", "Acciones"]}
          columnMapping={{
            Nombre: "name",
            Fecha: "createdAt",
          }}
          options={{ edit: handleEdit, delete: handleDelete }}
        />
      )}
      <ButtonContainer style={{ alignItems: "center" }}>
        {/* <div style={{ maxHeight: "20px" }}>
          <Calendar selected={formData.selectedDate} onChange={handleDateChange} />
        </div> */}
        <Button style={{ margin: "0" }} onClick={handleShowFormModal} $custom1>
          Hacer un registro
        </Button>
      </ButtonContainer>
      {showFormModal && (
        <AddRegistry
          collectionId={collection?._id as string}
          cropname={cropData.name}
          eto={eto}
          currentGrowth={1.75}
          etc={etc}
          recordId={editingRecordId}
          initialData={formData} // Pasar los datos del registro al componente AddRegistry
          onClose={handleFormModalClose}
          setRefetch={setRefetch}
        />
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
