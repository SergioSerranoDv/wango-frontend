import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AddRegistry } from "../components/modals/FormModal";
import { ApiContext } from "../context/ApiContext";
import { Calendar } from "../components/modals/Calendar";
import { LoadingAnimation } from "../components/Loading";
import { TableV1 } from "../components/TableV1";
import { MainLayout } from "../layouts/MainLayout";
import { calculateEt0andETc } from "../services/weather_s";
import { fetchCropDetails } from "../services/crop_s";
import { getCollectionByCropId } from "../services/collection_s";
import { Records } from "../interfaces/record";
import { Collection, CollectionDataInit } from "../interfaces/collection";
import { Crop, CropDataInit } from "../interfaces/crop";
import {
  ButtonContainer,
  Button,
  Description,
  FormContainer,
  SignBoard,
} from "../styles/FormStyles";

export const RegisterView = () => {
  const { id } = useParams();
  const cropId = id || "";
  const { backendApiCall } = useContext(ApiContext);
  const [collection, setCollection] = useState<Collection>(CollectionDataInit);
  const [collectionRecords, setCollectionRecords] = useState<Records[]>([]);
  const [cropData, setCropData] = useState<Crop>(CropDataInit);
  const [loadingCollectionData, setLoadingCollectionData] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [eto, setEto] = useState<number>(0);
  const [etc, setEtc] = useState<number>(0);
  const [refetch, setRefetch] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [formData, setFormData] = useState({
    nameCollection: "",
    cropName: "",
    initialCollectionDate: "",
    selectedDate: new Date(), // Estado para almacenar la fecha seleccionada
    latitude: "",
    longitude: "",
    currentStage: "",
  });

  useEffect(() => {
    async function fetchCollectionRecords() {
      if (cropId) {
        try {
          // Subprocess 1: Get collection by crop id to get the collection id
          const response = await getCollectionByCropId(backendApiCall, cropId);
          if (response.status === "success") {
            setCollection(response.data);
            // Subprocess 2: Get collection records by collection id
            const collectionRecords = await backendApiCall({
              method: "GET",
              endpoint: `v1/collection-record/paginated?page=${currentPage}&limit=${rowsPerPage}&collection_id=${response.data._id}`,
            });
            setCollectionRecords(collectionRecords.data.collectionRecords);
            setTotalPages(collectionRecords.data.meta.total_pages);
            setLoadingCollectionData(false);
          } else {
            console.log("Error getting collection status:", response.message);
          }
        } catch (error) {
          console.log("Error getting collecction data:", error);
        }
      }
    }
    fetchCollectionRecords();
  }, [backendApiCall, cropId]);

  useEffect(() => {
    handleRegisterButton();
  }, [backendApiCall, cropId, collection]);

  useEffect(() => {
    const fetchCropData = async () => {
      try {
        const response = await fetchCropDetails(backendApiCall, cropId);
        if (response.status === "success") {
          setCropData(response.data);
        }
      } catch (error) {
        console.log("Error fetching crop details:", error);
      }
    };
    const fetchEvotranspirationDataFromOpenMeteo = async () => {
      try {
        const { eto, etc } = await calculateEt0andETc();
        setEto(parseFloat(eto));
        setEtc(parseFloat(etc));
      } catch (error) {
        console.log("Error fetching crop details:", error);
      }
    };
    fetchCropData();
    fetchEvotranspirationDataFromOpenMeteo();
  }, [backendApiCall, cropId]);

  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const handleDateChange = (date: Date) => {
    setFormData({
      ...formData,
      selectedDate: date,
    });
  };

  const handleRegisterButton = () => {
    if (collection.status === "in_progress") {
      if (collection) {
      }
    }
  };
  const handleShowFormModal = () => {
    setShowFormModal(true);
  };

  const handleFormModalClose = () => {
    setShowFormModal(false);
  };

  const handleDelete = () => {};

  const handleEdit = () => {};

  if (loadingCollectionData) {
    return <LoadingAnimation />;
  }
  return (
    <MainLayout>
      <FormContainer>
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
          <div style={{ maxHeight: "20px" }}>
            <Calendar selected={formData.selectedDate} onChange={handleDateChange} />
          </div>
          <Button style={{ margin: "0" }} onClick={handleShowFormModal} $custom1>
            Hacer un registro
          </Button>
        </ButtonContainer>
      </FormContainer>
      {showFormModal && (
        <AddRegistry
          collectionId={collection?._id as string}
          cropname={cropData.name}
          eto={eto}
          currentGrowth={1.75}
          etc={etc}
          onClose={handleFormModalClose}
        />
      )}
    </MainLayout>
  );
};
